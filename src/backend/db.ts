import "reflect-metadata"
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  DataSource,
  Repository,
  In
} from "typeorm"
import { v4 as uuidv4 } from "uuid"
import type { EntityChange, EntityRef } from "../models/changeSets"
import {
  ChangeSet,
  PublicationBatch,
  Review,
  ContributionMedia,
  Contribution,
  ContributionStatus
} from "../models/contribution"

// Entities that map to our interfaces.

@Entity()
export class ChangeSetEntity implements ChangeSet {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: "varchar" })
  author!: string

  @Column({ type: "varchar" })
  title!: string

  @Column({ type: "varchar" })
  comments!: string

  @Column("bigint")
  timestamp!: number

  @Column("simple-json")
  changes!: EntityChange[]
}

@Entity()
export class PublicationBatchEntity implements PublicationBatch {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: "varchar" })
  title!: string

  @Column({ type: "varchar" })
  comments!: string

  @Column({ type: "varchar" })
  published!: boolean

  @OneToMany(() => ContributionEntity, (contribution) => contribution.batch)
  contributions!: ContributionEntity[]
}

@Entity()
export class ReviewEntity implements Review {
  @PrimaryGeneratedColumn()
  id!: number

  @ManyToOne(() => ChangeSetEntity)
  @JoinColumn()
  changeSet!: ChangeSetEntity

  @Column({ type: "int" })
  stackOrder!: number

  @ManyToOne(() => ContributionEntity, (contribution) => contribution.reviews)
  contribution!: ContributionEntity
}

@Entity()
export class ContributionMediaEntity implements ContributionMedia {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: "varchar" })
  type!: "audio" | "image" | "document"

  @Column({ type: "varchar" })
  file!: string

  @Column({ type: "varchar" })
  name!: string

  @Column({ type: "varchar" })
  comments!: string

  @ManyToOne(() => ContributionEntity, (contribution) => contribution.media)
  contribution!: ContributionEntity
}

@Entity()
export class ContributionEntity implements Contribution {
  @PrimaryColumn({ type: "varchar" })
  id!: string

  @Column("simple-json")
  root!: EntityRef

  @ManyToOne(() => ChangeSetEntity)
  @JoinColumn()
  changeSet!: ChangeSetEntity

  @Column({ type: "int" })
  status!: ContributionStatus

  @OneToMany(() => ReviewEntity, (review) => review.contribution, {
    cascade: true
  })
  reviews!: ReviewEntity[]

  @OneToMany(() => ContributionMediaEntity, (media) => media.contribution, {
    cascade: true
  })
  media!: ContributionMediaEntity[]

  @ManyToOne(() => PublicationBatchEntity, { nullable: true })
  @JoinColumn()
  batch?: PublicationBatchEntity
}

// Database connection (SQLite)
export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "contributions.sqlite",
  synchronize: true, // Set to false in production
  logging: true,
  entities: [
    ChangeSetEntity,
    PublicationBatchEntity,
    ReviewEntity,
    ContributionMediaEntity,
    ContributionEntity
  ],
  subscribers: [],
  migrations: []
})

// Initialize repositories
export class DatabaseService {
  private contributionRepo: Repository<ContributionEntity>

  constructor() {
    this.contributionRepo = AppDataSource.getRepository(ContributionEntity)
  }

  async createContribution(
    data: Partial<Contribution>
  ): Promise<ContributionEntity> {
    const contribution = this.contributionRepo.create({
      ...data,
      id: data.id || uuidv4()
    } as ContributionEntity)
    return this.contributionRepo.save(contribution)
  }

  async getContribution(id: string): Promise<ContributionEntity | null> {
    return this.contributionRepo.findOne({
      where: { id },
      relations: ["changeSet", "reviews", "reviews.changeSet", "media", "batch"]
    })
  }

  async listContributions(
    options: {
      page?: number
      limit?: number
      status?: ContributionStatus | ContributionStatus[]
      sortBy?: "author" | "timestamp"
      sortOrder?: "ASC" | "DESC"
    } = {}
  ): Promise<{
    data: ContributionEntity[]
    total: number
    page: number
    limit: number
  }> {
    const limit = Math.max(1000, options.limit ?? 10)
    const {
      page = 1,
      status,
      sortBy = "timestamp",
      sortOrder = "DESC"
    } = options

    const skip = (page - 1) * limit

    // Build the where clause for status filtering
    const where: any = {}
    if (status !== undefined) {
      where.status = Array.isArray(status) ? In(status) : status
    }

    // Build query with appropriate sorting
    const queryBuilder = this.contributionRepo
      .createQueryBuilder("contribution")
      .leftJoinAndSelect("contribution.changeSet", "changeSet")
      .leftJoinAndSelect("contribution.reviews", "reviews")
      .leftJoinAndSelect("reviews.changeSet", "reviewChangeSet")

    // Apply the where clause for status filtering
    if (Object.keys(where).length > 0) {
      queryBuilder.where(where)
    }

    // Apply sorting
    if (sortBy === "author") {
      queryBuilder.orderBy("changeSet.author", sortOrder)
    } else if (sortBy === "timestamp") {
      // This creates a subquery to get the latest timestamp among the
      // contribution's changeset and all review changesets
      queryBuilder
        .addSelect(
          `(
        SELECT MAX(CASE 
          WHEN reviews.id IS NULL THEN changeSet.timestamp 
          ELSE GREATEST(changeSet.timestamp, reviewChangeSet.timestamp) 
        END)
        FROM contribution c
        LEFT JOIN c.changeSet cs
        LEFT JOIN c.reviews r
        LEFT JOIN r.changeSet rcs
        WHERE c.id = contribution.id
      )`,
          "latestTimestamp"
        )
        .orderBy("latestTimestamp", sortOrder)
    }

    // Add pagination
    queryBuilder.skip(skip).take(limit)

    // Execute the query
    const [data, total] = await queryBuilder.getManyAndCount()

    return {
      data,
      total,
      page,
      limit
    }
  }

  async updateContribution(
    id: string,
    data: Partial<Contribution>
  ): Promise<ContributionEntity | null> {
    await this.contributionRepo.update(id, data as Partial<ContributionEntity>)
    return this.getContribution(id)
  }

  async deleteContribution(id: string): Promise<boolean> {
    const result = await this.contributionRepo.delete(id)
    return result.affected ? result.affected > 0 : false
  }
}

// Initialize database connection.
export const initDatabase = async (): Promise<void> => {
  try {
    await AppDataSource.initialize()
    console.log("Database connection established")
  } catch (error) {
    console.error("Error connecting to database:", error)
    throw error
  }
}
