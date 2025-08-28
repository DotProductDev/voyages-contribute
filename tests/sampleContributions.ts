import { Contribution } from "../src/models/contribution"

export const sampleContributions: Contribution[] = [
  {
    id: "Voyage.Voyage.500001",
    root: {
      id: "500001",
      schema: "Voyage",
      type: "new"
    },
    changeSet: {
      id: "376055ac-fc06-40c1-a48c-9a88646c7e1c",
      author: "CSV importer script",
      title: "Import of Voyage #500001",
      comments:
        "Imported from CSV file IOA_Voyages updated sources.csv on 2025-07-18T16:29:10.085Z",
      timestamp: 1752856150082,
      changes: [
        {
          type: "update",
          entityRef: {
            id: "500001",
            schema: "Voyage",
            type: "new"
          },
          changes: [
            {
              kind: "direct",
              property: "Voyage_voyage_id",
              changed: "500001"
            },
            {
              kind: "direct",
              property: "Voyage_dataset",
              changed: "3"
            },
            {
              kind: "linked",
              property: "Voyage_voyage_groupings",
              changed: null
            },
            {
              kind: "owned",
              property: "Voyage_Ship",
              ownedEntity: {
                entityRef: {
                  id: "61eb7467-9d0d-4ab0-8a7f-d858ead37c1f",
                  schema: "VoyageShip",
                  type: "new"
                },
                data: {},
                state: "new"
              },
              changes: [
                {
                  kind: "direct",
                  property: "VoyageShip_ship_name",
                  changed: "Roode Vos"
                },
                {
                  kind: "linked",
                  property: "VoyageShip_nationality_ship_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 8,
                      schema: "Nationality"
                    },
                    data: {
                      "Nation name": "Netherlands",
                      Code: 8,
                      id: 8
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageShip_rig_of_vessel_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 38,
                      schema: "RigOfVessel"
                    },
                    data: {
                      "Rig of vessel": "Galjoot",
                      Code: 38,
                      id: 38
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "direct",
                  property: "VoyageShip_tonnage",
                  changed: "60"
                },
                {
                  kind: "linked",
                  property: "VoyageShip_imputed_nationality_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 8,
                      schema: "Nationality"
                    },
                    data: {
                      "Nation name": "Netherlands",
                      Code: 8,
                      id: 8
                    },
                    state: "lazy"
                  }
                }
              ]
            },
            {
              kind: "owned",
              property: "Voyage_Outcome",
              ownedEntity: {
                entityRef: {
                  id: "d3d81820-57c0-44cf-bed3-dc05ef3d9232",
                  schema: "VoyageOutcome",
                  type: "new"
                },
                data: {},
                state: "new"
              },
              changes: [
                {
                  kind: "linked",
                  property: "VoyageOutcome_particular_outcome_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 34,
                      schema: "ParticularOutcome"
                    },
                    data: {
                      Name: "Left coast with trading cargo intact",
                      Value: 41,
                      id: 34
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageOutcome_outcome_slaves_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 5,
                      schema: "SlavesOutcome"
                    },
                    data: {
                      Name: "No information on slaves",
                      Value: 6,
                      id: 5
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageOutcome_vessel_captured_outcome_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 13,
                      schema: "VesselOutcomeSchema"
                    },
                    data: {
                      Name: "Not captured",
                      Value: 14,
                      id: 13
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageOutcome_outcome_owner_id",
                  changed: null
                }
              ]
            },
            {
              kind: "owned",
              property: "Voyage_Itinerary",
              ownedEntity: {
                entityRef: {
                  id: "5191ca27-9046-49e3-a5c3-5c7f04be13d7",
                  schema: "VoyageItinerary",
                  type: "new"
                },
                data: {},
                state: "new"
              },
              changes: [
                {
                  kind: "linked",
                  property: "VoyageItinerary_int_first_port_emb_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1829,
                      schema: "Location"
                    },
                    data: {
                      Name: "Madagascar",
                      Code: 60811,
                      id: 1829
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageItinerary_port_of_departure_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1822,
                      schema: "Location"
                    },
                    data: {
                      Name: "Cape of Good Hope",
                      Code: 60803,
                      id: 1822
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageItinerary_imp_port_voyage_begin_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1822,
                      schema: "Location"
                    },
                    data: {
                      Name: "Cape of Good Hope",
                      Code: 60803,
                      id: 1822
                    },
                    state: "lazy"
                  }
                }
              ]
            },
            {
              kind: "owned",
              property: "Voyage_Dates",
              ownedEntity: {
                entityRef: {
                  id: "e2c2da0d-66dc-41fb-9e00-7982980564ad",
                  schema: "VoyageDates",
                  type: "new"
                },
                data: {},
                state: "new"
              },
              changes: [
                {
                  kind: "linked",
                  property: "VoyageDates_imp_voyage_began_sparsedate_id",
                  changed: {
                    entityRef: {
                      id: "cf7607f8-25a6-4972-8973-979a4d806ac3",
                      schema: "VoyageSparseDate",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  linkedChanges: [
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_year",
                      changed: "1654"
                    }
                  ]
                },
                {
                  kind: "linked",
                  property:
                    "VoyageDates_imp_arrival_at_port_of_dis_sparsedate_id",
                  changed: {
                    entityRef: {
                      id: "0e9091c7-6a8e-4c88-83d7-85103742bec4",
                      schema: "VoyageSparseDate",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  linkedChanges: [
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_year",
                      changed: "1654"
                    }
                  ]
                },
                {
                  kind: "linked",
                  property: "VoyageDates_voyage_began_sparsedate_id",
                  changed: {
                    entityRef: {
                      id: "7aaf755b-7735-4daa-97bf-5aae2cfab030",
                      schema: "VoyageSparseDate",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  linkedChanges: [
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_year",
                      changed: "1654"
                    },
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_month",
                      changed: "05"
                    },
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_day",
                      changed: "08"
                    }
                  ]
                },
                {
                  kind: "linked",
                  property: "VoyageDates_voyage_completed_sparsedate_id",
                  changed: {
                    entityRef: {
                      id: "2d52cfaa-5576-4e27-8201-00b0b223a154",
                      schema: "VoyageSparseDate",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  linkedChanges: [
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_year",
                      changed: "1654"
                    },
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_month",
                      changed: "08"
                    },
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_day",
                      changed: "25"
                    }
                  ]
                }
              ]
            },
            {
              kind: "owned",
              property: "Voyage_Slave numbers",
              ownedEntity: {
                entityRef: {
                  id: "5917feef-7fbc-475f-b54a-2104dae10ece",
                  schema: "VoyageSlaveNumbers",
                  type: "new"
                },
                data: {},
                state: "new"
              },
              changes: [
                {
                  kind: "direct",
                  property: "VoyageSlaveNumbers_imp_total_num_slaves_embarked",
                  changed: "67"
                },
                {
                  kind: "direct",
                  property:
                    "VoyageSlaveNumbers_imp_total_num_slaves_disembarked",
                  changed: "52"
                }
              ]
            },
            {
              kind: "ownedList",
              property: "Voyage_Sources",
              removed: [],
              modified: [
                {
                  kind: "owned",
                  ownedEntity: {
                    entityRef: {
                      id: "98fe4515-03db-4492-9ee7-007df7713c21",
                      schema: "Voyage Source Connection",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  changes: [
                    {
                      kind: "linked",
                      property: "Voyage Source Connection_source_id",
                      changed: {
                        entityRef: {
                          type: "existing",
                          id: 19532,
                          schema: "Voyage Source"
                        },
                        data: {
                          Title:
                            "Daghregister Gehouden by Den Oppercoopman Jan Anthonisz Van Riebeeck",
                          Bibliography: null,
                          Notes: null,
                          id: 19532,
                          "Short reference id": 2727
                        },
                        state: "lazy"
                      }
                    },
                    {
                      kind: "direct",
                      property: "Voyage Source Connection_page_range",
                      changed: "d. 1, 222"
                    }
                  ]
                },
                {
                  kind: "owned",
                  ownedEntity: {
                    entityRef: {
                      id: "4ea4351b-8fe4-4b53-aa18-a7a585b35ee9",
                      schema: "Voyage Source Connection",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  changes: [
                    {
                      kind: "linked",
                      property: "Voyage Source Connection_source_id",
                      changed: {
                        entityRef: {
                          type: "existing",
                          id: 1667,
                          schema: "Voyage Source"
                        },
                        data: {
                          Title:
                            "Precis of the Archives of the Cape of Good Hope",
                          Bibliography:
                            "<div class=\"csl-bib-body\" style=\"line-height: 1.35; padding-left: 1em; text-indent:-1em;\">\r\n  <div class=\"csl-entry\">Leibbrandt, H. C. V., ed. <i>Precis of the Archives of the Cape of Good Hope</i>. 16 vols. Cape Town, ZA: W. A. Richards & sons, n.d.</div>\r\n</div>",
                          Notes:
                            "FULL REF: Leibbrandt, Hendrik Carel Vos (ed.), <i>Precis of the Archives of the Cape of Good Hope</i>, 16 vols. (Cape Town, 1896-1906).       \\DOC TYPE: Published source",
                          id: 1667,
                          "Short reference id": 863
                        },
                        state: "lazy"
                      }
                    },
                    {
                      kind: "direct",
                      property: "Voyage Source Connection_page_range",
                      changed: "Precis, 1649-1662, v. 1, 302-303"
                    }
                  ]
                }
              ]
            },
            {
              kind: "ownedList",
              property: "Voyage_Enslavement relations",
              removed: [],
              modified: [
                {
                  kind: "owned",
                  ownedEntity: {
                    entityRef: {
                      id: "559f6455-0b20-4cdd-8c79-68746bec750b",
                      schema: "EnslavementRelation",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  changes: [
                    {
                      kind: "linked",
                      property: "EnslavementRelation_relation_type_id",
                      changed: {
                        entityRef: {
                          type: "existing",
                          id: 1,
                          schema: "EnslavementRelationType"
                        },
                        data: {
                          "Relation type": "Transaction",
                          id: 1
                        },
                        state: "lazy"
                      }
                    },
                    {
                      kind: "ownedList",
                      property: "EnslavementRelation_Enslavers in relation",
                      removed: [],
                      modified: [
                        {
                          kind: "owned",
                          ownedEntity: {
                            entityRef: {
                              id: "c19418d1-2b1a-422b-b6db-9c073d37d486",
                              schema: "EnslaverInRelation",
                              type: "new"
                            },
                            data: {},
                            state: "new"
                          },
                          changes: [
                            {
                              kind: "linked",
                              property: "EnslaverInRelation_enslaver_alias_id",
                              changed: {
                                entityRef: {
                                  id: "CanonicalEnslaverAliasId_VOC",
                                  schema: "EnslaverAliasWithIdentity",
                                  type: "new"
                                },
                                data: {},
                                state: "new"
                              },
                              linkedChanges: [
                                {
                                  kind: "direct",
                                  property:
                                    "EnslaverAlias_alias_EnslaverAliasWithIdentity",
                                  changed: "VOC"
                                },
                                {
                                  kind: "linked",
                                  property:
                                    "EnslaverAliasWithIdentity_identity_id",
                                  changed: {
                                    entityRef: {
                                      id: "CanonicalEnslaverIdentityId_VOC",
                                      schema: "Enslaver",
                                      type: "new"
                                    },
                                    data: {},
                                    state: "new"
                                  },
                                  linkedChanges: [
                                    {
                                      kind: "direct",
                                      property: "Enslaver_principal_alias",
                                      changed: "VOC"
                                    }
                                  ]
                                }
                              ]
                            },
                            {
                              kind: "ownedList",
                              property: "EnslaverInRelation_Roles",
                              removed: [],
                              modified: [
                                {
                                  kind: "owned",
                                  ownedEntity: {
                                    entityRef: {
                                      id: "7f449817-24bf-4374-a9bd-4b641e989623",
                                      schema: "EnslaverRelationRoleConn",
                                      type: "new"
                                    },
                                    data: {},
                                    state: "new"
                                  },
                                  changes: [
                                    {
                                      kind: "linked",
                                      property:
                                        "EnslaverRelationRoleConn_enslaverrole_id",
                                      changed: {
                                        entityRef: {
                                          type: "existing",
                                          id: 4,
                                          schema: "EnslaverRole"
                                        },
                                        data: {
                                          "Enslaver role": "Seller",
                                          id: 4
                                        },
                                        state: "lazy"
                                      }
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    status: 0,
    reviews: [],
    media: [],
    batch: {
      id: 1,
      title: "Import of Voyage from IOA_Voyages updated sources.csv",
      comments:
        "Batch created for import of Voyage from CSV file IOA_Voyages updated sources.csv",
      published: null
    }
  },
  {
    id: "Voyage.Voyage.500002",
    root: {
      id: "500002",
      schema: "Voyage",
      type: "new"
    },
    changeSet: {
      id: "33b4a42d-c381-42a9-8ad7-37317b233084",
      author: "CSV importer script",
      title: "Import of Voyage #500002",
      comments:
        "Imported from CSV file IOA_Voyages updated sources.csv on 2025-07-18T16:29:10.105Z",
      timestamp: 1752856150098,
      changes: [
        {
          type: "update",
          entityRef: {
            id: "500002",
            schema: "Voyage",
            type: "new"
          },
          changes: [
            {
              kind: "direct",
              property: "Voyage_voyage_id",
              changed: "500002"
            },
            {
              kind: "direct",
              property: "Voyage_dataset",
              changed: "3"
            },
            {
              kind: "linked",
              property: "Voyage_voyage_groupings",
              changed: null
            },
            {
              kind: "owned",
              property: "Voyage_Ship",
              ownedEntity: {
                entityRef: {
                  id: "02cb7ecb-b99e-40c3-878d-ae24ad87af91",
                  schema: "VoyageShip",
                  type: "new"
                },
                data: {},
                state: "new"
              },
              changes: [
                {
                  kind: "direct",
                  property: "VoyageShip_ship_name",
                  changed: "Tulp"
                },
                {
                  kind: "linked",
                  property: "VoyageShip_nationality_ship_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 8,
                      schema: "Nationality"
                    },
                    data: {
                      "Nation name": "Netherlands",
                      Code: 8,
                      id: 8
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageShip_rig_of_vessel_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 16,
                      schema: "RigOfVessel"
                    },
                    data: {
                      "Rig of vessel": "Galliot",
                      Code: 16,
                      id: 16
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageShip_imputed_nationality_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 8,
                      schema: "Nationality"
                    },
                    data: {
                      "Nation name": "Netherlands",
                      Code: 8,
                      id: 8
                    },
                    state: "lazy"
                  }
                }
              ]
            },
            {
              kind: "owned",
              property: "Voyage_Outcome",
              ownedEntity: {
                entityRef: {
                  id: "e61ccd21-3b17-4be5-ac80-78c02a9fe9ac",
                  schema: "VoyageOutcome",
                  type: "new"
                },
                data: {},
                state: "new"
              },
              changes: [
                {
                  kind: "linked",
                  property: "VoyageOutcome_particular_outcome_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1,
                      schema: "ParticularOutcome"
                    },
                    data: {
                      Name: "Voyage completed as intended",
                      Value: 1,
                      id: 1
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageOutcome_outcome_slaves_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1,
                      schema: "SlavesOutcome"
                    },
                    data: {
                      Name: "Slaves disembarked in Old World",
                      Value: 3,
                      id: 1
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageOutcome_vessel_captured_outcome_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 13,
                      schema: "VesselOutcomeSchema"
                    },
                    data: {
                      Name: "Not captured",
                      Value: 14,
                      id: 13
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageOutcome_outcome_owner_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1,
                      schema: "OwnerOutcome"
                    },
                    data: {
                      Name: "Delivered slaves for original owners",
                      Value: 1,
                      id: 1
                    },
                    state: "lazy"
                  }
                }
              ]
            },
            {
              kind: "owned",
              property: "Voyage_Itinerary",
              ownedEntity: {
                entityRef: {
                  id: "3332589b-95ab-4273-8786-685b7975e977",
                  schema: "VoyageItinerary",
                  type: "new"
                },
                data: {},
                state: "new"
              },
              changes: [
                {
                  kind: "linked",
                  property: "VoyageItinerary_int_first_port_emb_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1851,
                      schema: "Location"
                    },
                    data: {
                      Name: "Antongil Bay",
                      Code: 60840,
                      id: 1851
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageItinerary_int_first_port_dis_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1822,
                      schema: "Location"
                    },
                    data: {
                      Name: "Cape of Good Hope",
                      Code: 60803,
                      id: 1822
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageItinerary_port_of_departure_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1822,
                      schema: "Location"
                    },
                    data: {
                      Name: "Cape of Good Hope",
                      Code: 60803,
                      id: 1822
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageItinerary_first_place_slave_purchase_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1851,
                      schema: "Location"
                    },
                    data: {
                      Name: "Antongil Bay",
                      Code: 60840,
                      id: 1851
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageItinerary_first_landing_place_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1822,
                      schema: "Location"
                    },
                    data: {
                      Name: "Cape of Good Hope",
                      Code: 60803,
                      id: 1822
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageItinerary_imp_port_voyage_begin_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1822,
                      schema: "Location"
                    },
                    data: {
                      Name: "Cape of Good Hope",
                      Code: 60803,
                      id: 1822
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property:
                    "VoyageItinerary_imp_principal_place_of_slave_purchase_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1851,
                      schema: "Location"
                    },
                    data: {
                      Name: "Antongil Bay",
                      Code: 60840,
                      id: 1851
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageItinerary_imp_principal_port_slave_dis_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1822,
                      schema: "Location"
                    },
                    data: {
                      Name: "Cape of Good Hope",
                      Code: 60803,
                      id: 1822
                    },
                    state: "lazy"
                  }
                }
              ]
            },
            {
              kind: "owned",
              property: "Voyage_Dates",
              ownedEntity: {
                entityRef: {
                  id: "e5a657a1-480f-49c5-a919-c83db2b94f09",
                  schema: "VoyageDates",
                  type: "new"
                },
                data: {},
                state: "new"
              },
              changes: [
                {
                  kind: "direct",
                  property:
                    "VoyageDates_imp_length_leaving_africa_to_disembark",
                  changed: "47"
                },
                {
                  kind: "linked",
                  property: "VoyageDates_imp_voyage_began_sparsedate_id",
                  changed: {
                    entityRef: {
                      id: "ee92da28-4172-4012-8754-f1ac54ed17a6",
                      schema: "VoyageSparseDate",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  linkedChanges: [
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_year",
                      changed: "1654"
                    }
                  ]
                },
                {
                  kind: "linked",
                  property:
                    "VoyageDates_imp_arrival_at_port_of_dis_sparsedate_id",
                  changed: {
                    entityRef: {
                      id: "b40f74e9-fe54-4665-8ce4-2feb34ea1f4b",
                      schema: "VoyageSparseDate",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  linkedChanges: [
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_year",
                      changed: "1654"
                    }
                  ]
                },
                {
                  kind: "linked",
                  property: "VoyageDates_voyage_began_sparsedate_id",
                  changed: {
                    entityRef: {
                      id: "473bd9b6-8f4a-45f3-8d8f-dde7ba369968",
                      schema: "VoyageSparseDate",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  linkedChanges: [
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_year",
                      changed: "1654"
                    },
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_month",
                      changed: "07"
                    },
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_day",
                      changed: "03"
                    }
                  ]
                },
                {
                  kind: "linked",
                  property: "VoyageDates_voyage_completed_sparsedate_id",
                  changed: {
                    entityRef: {
                      id: "c7e00eff-a972-47ab-9d00-4f0d15be5d08",
                      schema: "VoyageSparseDate",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  linkedChanges: [
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_year",
                      changed: "1654"
                    },
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_month",
                      changed: "12"
                    },
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_day",
                      changed: "12"
                    }
                  ]
                },
                {
                  kind: "linked",
                  property: "VoyageDates_date_departed_africa_sparsedate_id",
                  changed: {
                    entityRef: {
                      id: "0c200238-11d7-4bcf-8cb1-07a697e18620",
                      schema: "VoyageSparseDate",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  linkedChanges: [
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_year",
                      changed: "1654"
                    },
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_month",
                      changed: "10"
                    },
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_day",
                      changed: "26"
                    }
                  ]
                }
              ]
            },
            {
              kind: "owned",
              property: "Voyage_Slave numbers",
              ownedEntity: {
                entityRef: {
                  id: "fe2fba83-7fed-455c-bdfa-dc4d758b4611",
                  schema: "VoyageSlaveNumbers",
                  type: "new"
                },
                data: {},
                state: "new"
              },
              changes: [
                {
                  kind: "direct",
                  property: "VoyageSlaveNumbers_num_slaves_carried_first_port",
                  changed: "3"
                },
                {
                  kind: "direct",
                  property: "VoyageSlaveNumbers_num_slaves_carried_second_port",
                  changed: "0"
                },
                {
                  kind: "direct",
                  property: "VoyageSlaveNumbers_num_slaves_carried_third_port",
                  changed: "0"
                },
                {
                  kind: "direct",
                  property: "VoyageSlaveNumbers_total_num_slaves_purchased",
                  changed: "3"
                },
                {
                  kind: "direct",
                  property:
                    "VoyageSlaveNumbers_total_num_slaves_arr_first_port_embark",
                  changed: "3"
                },
                {
                  kind: "direct",
                  property:
                    "VoyageSlaveNumbers_num_slaves_disembark_first_place",
                  changed: "3"
                },
                {
                  kind: "direct",
                  property:
                    "VoyageSlaveNumbers_num_slaves_disembark_second_place",
                  changed: "0"
                },
                {
                  kind: "direct",
                  property:
                    "VoyageSlaveNumbers_num_slaves_disembark_third_place",
                  changed: "0"
                },
                {
                  kind: "direct",
                  property: "VoyageSlaveNumbers_imp_total_num_slaves_embarked",
                  changed: "3"
                },
                {
                  kind: "direct",
                  property:
                    "VoyageSlaveNumbers_imp_total_num_slaves_disembarked",
                  changed: "3"
                },
                {
                  kind: "table",
                  property: "sn_characteristics",
                  changes: {
                    num_men_embark_first_port_purchase: "0",
                    num_women_embark_first_port_purchase: "1",
                    num_boy_embark_first_port_purchase: "1",
                    num_girl_embark_first_port_purchase: "1",
                    num_adult_embark_first_port_purchase: "1",
                    num_child_embark_first_port_purchase: "0",
                    num_infant_embark_first_port_purchase: "0",
                    num_men_disembark_first_landing: "0",
                    num_women_disembark_first_landing: "1",
                    num_boy_disembark_first_landing: "1",
                    num_girl_disembark_first_landing: "1",
                    num_adult_disembark_first_landing: "1",
                    num_child_disembark_first_landing: "2",
                    num_infant_disembark_first_landing: "0"
                  }
                },
                {
                  kind: "direct",
                  property:
                    "VoyageSlaveNumbers_total_slaves_landed_age_identified",
                  changed: "6"
                },
                {
                  kind: "direct",
                  property:
                    "VoyageSlaveNumbers_total_slaves_dept_or_arr_age_identified",
                  changed: "6"
                },
                {
                  kind: "direct",
                  property:
                    "VoyageSlaveNumbers_child_ratio_among_landed_slaves",
                  changed: "0.666666667"
                },
                {
                  kind: "direct",
                  property: "VoyageSlaveNumbers_percentage_child",
                  changed: "0.666666667"
                },
                {
                  kind: "table",
                  property: "sn_characteristics_imputed",
                  changes: {
                    imp_num_adult_landed: "2",
                    imp_num_child_landed: "4",
                    imp_num_adult_total: "2",
                    imp_num_child_total: "4"
                  }
                }
              ]
            },
            {
              kind: "ownedList",
              property: "Voyage_Sources",
              removed: [],
              modified: [
                {
                  kind: "owned",
                  ownedEntity: {
                    entityRef: {
                      id: "9a49e49d-c8a2-47f7-9e38-e28ffa9c638f",
                      schema: "Voyage Source Connection",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  changes: [
                    {
                      kind: "linked",
                      property: "Voyage Source Connection_source_id",
                      changed: {
                        entityRef: {
                          type: "existing",
                          id: 19532,
                          schema: "Voyage Source"
                        },
                        data: {
                          Title:
                            "Daghregister Gehouden by Den Oppercoopman Jan Anthonisz Van Riebeeck",
                          Bibliography: null,
                          Notes: null,
                          id: 19532,
                          "Short reference id": 2727
                        },
                        state: "lazy"
                      }
                    },
                    {
                      kind: "direct",
                      property: "Voyage Source Connection_page_range",
                      changed: "235, 268-270"
                    }
                  ]
                },
                {
                  kind: "owned",
                  ownedEntity: {
                    entityRef: {
                      id: "c29a477e-4548-4ebb-b59f-2f45b7fbeb65",
                      schema: "Voyage Source Connection",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  changes: [
                    {
                      kind: "linked",
                      property: "Voyage Source Connection_source_id",
                      changed: {
                        entityRef: {
                          type: "existing",
                          id: 1667,
                          schema: "Voyage Source"
                        },
                        data: {
                          Title:
                            "Precis of the Archives of the Cape of Good Hope",
                          Bibliography:
                            "<div class=\"csl-bib-body\" style=\"line-height: 1.35; padding-left: 1em; text-indent:-1em;\">\r\n  <div class=\"csl-entry\">Leibbrandt, H. C. V., ed. <i>Precis of the Archives of the Cape of Good Hope</i>. 16 vols. Cape Town, ZA: W. A. Richards & sons, n.d.</div>\r\n</div>",
                          Notes:
                            "FULL REF: Leibbrandt, Hendrik Carel Vos (ed.), <i>Precis of the Archives of the Cape of Good Hope</i>, 16 vols. (Cape Town, 1896-1906).       \\DOC TYPE: Published source",
                          id: 1667,
                          "Short reference id": 863
                        },
                        state: "lazy"
                      }
                    },
                    {
                      kind: "direct",
                      property: "Voyage Source Connection_page_range",
                      changed:
                        "Precis, Letters Dispatched, 1649-1662, v. 306-319"
                    }
                  ]
                },
                {
                  kind: "owned",
                  ownedEntity: {
                    entityRef: {
                      id: "5f42cba9-aa40-4995-9e8f-50e97ada0821",
                      schema: "Voyage Source Connection",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  changes: [
                    {
                      kind: "linked",
                      property: "Voyage Source Connection_source_id",
                      changed: {
                        entityRef: {
                          type: "existing",
                          id: 1065,
                          schema: "Voyage Source"
                        },
                        data: {
                          Title:
                            "Slaves and Free Blacks at the Cape, 1658-1700",
                          Bibliography:
                            "<div class=\"csl-bib-body\" style=\"line-height: 1.35; padding-left: 1em; text-indent:-1em;\">\r\n  <div class=\"csl-entry\">Böeseken, A. J. <i>Slaves and Free Blacks at the Cape, 1658-1700</i>. 1st Edition. Cape Town, ZA: Tafelberg, 1977.</div>\r\n</div>",
                          Notes:
                            "FULL REF: <p>B&ouml;eseken, A. J., <em>Slaves and Free Blacks at the Cape, 1658-1700</em> (Capetown, 1977).</p>\\DOC TYPE: Published source",
                          id: 1065,
                          "Short reference id": 262
                        },
                        state: "lazy"
                      }
                    },
                    {
                      kind: "direct",
                      property: "Voyage Source Connection_page_range",
                      changed: "8"
                    }
                  ]
                }
              ]
            },
            {
              kind: "ownedList",
              property: "Voyage_Enslavement relations",
              removed: [],
              modified: [
                {
                  kind: "owned",
                  ownedEntity: {
                    entityRef: {
                      id: "4e6af8d3-8c97-43b4-8617-8b734bdffcc5",
                      schema: "EnslavementRelation",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  changes: [
                    {
                      kind: "linked",
                      property: "EnslavementRelation_relation_type_id",
                      changed: {
                        entityRef: {
                          type: "existing",
                          id: 1,
                          schema: "EnslavementRelationType"
                        },
                        data: {
                          "Relation type": "Transaction",
                          id: 1
                        },
                        state: "lazy"
                      }
                    },
                    {
                      kind: "ownedList",
                      property: "EnslavementRelation_Enslavers in relation",
                      removed: [],
                      modified: [
                        {
                          kind: "owned",
                          ownedEntity: {
                            entityRef: {
                              id: "55348743-e21a-4de7-8908-da131e2c004c",
                              schema: "EnslaverInRelation",
                              type: "new"
                            },
                            data: {},
                            state: "new"
                          },
                          changes: [
                            {
                              kind: "linked",
                              property: "EnslaverInRelation_enslaver_alias_id",
                              changed: {
                                entityRef: {
                                  id: "CanonicalEnslaverAliasId_VOC",
                                  schema: "EnslaverAliasWithIdentity",
                                  type: "new"
                                },
                                data: {},
                                state: "new"
                              },
                              linkedChanges: [
                                {
                                  kind: "direct",
                                  property:
                                    "EnslaverAlias_alias_EnslaverAliasWithIdentity",
                                  changed: "VOC"
                                },
                                {
                                  kind: "linked",
                                  property:
                                    "EnslaverAliasWithIdentity_identity_id",
                                  changed: {
                                    entityRef: {
                                      id: "CanonicalEnslaverIdentityId_VOC",
                                      schema: "Enslaver",
                                      type: "new"
                                    },
                                    data: {},
                                    state: "new"
                                  },
                                  linkedChanges: [
                                    {
                                      kind: "direct",
                                      property: "Enslaver_principal_alias",
                                      changed: "VOC"
                                    }
                                  ]
                                }
                              ]
                            },
                            {
                              kind: "ownedList",
                              property: "EnslaverInRelation_Roles",
                              removed: [],
                              modified: [
                                {
                                  kind: "owned",
                                  ownedEntity: {
                                    entityRef: {
                                      id: "254420ce-c46f-4021-9d5e-b535d2718ab1",
                                      schema: "EnslaverRelationRoleConn",
                                      type: "new"
                                    },
                                    data: {},
                                    state: "new"
                                  },
                                  changes: [
                                    {
                                      kind: "linked",
                                      property:
                                        "EnslaverRelationRoleConn_enslaverrole_id",
                                      changed: {
                                        entityRef: {
                                          type: "existing",
                                          id: 4,
                                          schema: "EnslaverRole"
                                        },
                                        data: {
                                          "Enslaver role": "Seller",
                                          id: 4
                                        },
                                        state: "lazy"
                                      }
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        },
                        {
                          kind: "owned",
                          ownedEntity: {
                            entityRef: {
                              id: "7ccccde8-72b5-4cb7-80c6-06eac27b94f5",
                              schema: "EnslaverInRelation",
                              type: "new"
                            },
                            data: {},
                            state: "new"
                          },
                          changes: [
                            {
                              kind: "linked",
                              property: "EnslaverInRelation_enslaver_alias_id",
                              changed: {
                                entityRef: {
                                  id: "CanonicalEnslaverAliasId_Volkertse, Samuel",
                                  schema: "EnslaverAliasWithIdentity",
                                  type: "new"
                                },
                                data: {},
                                state: "new"
                              },
                              linkedChanges: [
                                {
                                  kind: "direct",
                                  property:
                                    "EnslaverAlias_alias_EnslaverAliasWithIdentity",
                                  changed: "Volkertse, Samuel"
                                },
                                {
                                  kind: "linked",
                                  property:
                                    "EnslaverAliasWithIdentity_identity_id",
                                  changed: {
                                    entityRef: {
                                      id: "CanonicalEnslaverIdentityId_Volkertse, Samuel",
                                      schema: "Enslaver",
                                      type: "new"
                                    },
                                    data: {},
                                    state: "new"
                                  },
                                  linkedChanges: [
                                    {
                                      kind: "direct",
                                      property: "Enslaver_principal_alias",
                                      changed: "Volkertse, Samuel"
                                    }
                                  ]
                                }
                              ]
                            },
                            {
                              kind: "ownedList",
                              property: "EnslaverInRelation_Roles",
                              removed: [],
                              modified: [
                                {
                                  kind: "owned",
                                  ownedEntity: {
                                    entityRef: {
                                      id: "9d03f1df-c44f-4827-8d65-014843b6b4f9",
                                      schema: "EnslaverRelationRoleConn",
                                      type: "new"
                                    },
                                    data: {},
                                    state: "new"
                                  },
                                  changes: [
                                    {
                                      kind: "linked",
                                      property:
                                        "EnslaverRelationRoleConn_enslaverrole_id",
                                      changed: {
                                        entityRef: {
                                          type: "existing",
                                          id: 1,
                                          schema: "EnslaverRole"
                                        },
                                        data: {
                                          "Enslaver role": "Captain",
                                          id: 1
                                        },
                                        state: "lazy"
                                      }
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    status: 0,
    reviews: [],
    media: [],
    batch: {
      id: 1,
      title: "Import of Voyage from IOA_Voyages updated sources.csv",
      comments:
        "Batch created for import of Voyage from CSV file IOA_Voyages updated sources.csv",
      published: null
    }
  },
  {
    id: "Voyage.Voyage.500003",
    root: {
      id: "500003",
      schema: "Voyage",
      type: "new"
    },
    changeSet: {
      id: "47f96f7c-15c3-4811-908c-9cc1c38c2fbf",
      author: "CSV importer script",
      title: "Import of Voyage #500003",
      comments:
        "Imported from CSV file IOA_Voyages updated sources.csv on 2025-07-18T16:29:10.119Z",
      timestamp: 1752856150113,
      changes: [
        {
          type: "update",
          entityRef: {
            id: "500003",
            schema: "Voyage",
            type: "new"
          },
          changes: [
            {
              kind: "direct",
              property: "Voyage_voyage_id",
              changed: "500003"
            },
            {
              kind: "direct",
              property: "Voyage_dataset",
              changed: "3"
            },
            {
              kind: "linked",
              property: "Voyage_voyage_groupings",
              changed: null
            },
            {
              kind: "owned",
              property: "Voyage_Ship",
              ownedEntity: {
                entityRef: {
                  id: "651a0270-5fb0-4ab9-b080-8292f5cb15d3",
                  schema: "VoyageShip",
                  type: "new"
                },
                data: {},
                state: "new"
              },
              changes: [
                {
                  kind: "direct",
                  property: "VoyageShip_ship_name",
                  changed: "Tulp"
                },
                {
                  kind: "linked",
                  property: "VoyageShip_nationality_ship_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 8,
                      schema: "Nationality"
                    },
                    data: {
                      "Nation name": "Netherlands",
                      Code: 8,
                      id: 8
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageShip_rig_of_vessel_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 16,
                      schema: "RigOfVessel"
                    },
                    data: {
                      "Rig of vessel": "Galliot",
                      Code: 16,
                      id: 16
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageShip_imputed_nationality_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 8,
                      schema: "Nationality"
                    },
                    data: {
                      "Nation name": "Netherlands",
                      Code: 8,
                      id: 8
                    },
                    state: "lazy"
                  }
                }
              ]
            },
            {
              kind: "owned",
              property: "Voyage_Crew",
              ownedEntity: {
                entityRef: {
                  id: "fd9a5066-ff47-49e1-aecf-d8b86b7fb032",
                  schema: "VoyageCrew",
                  type: "new"
                },
                data: {},
                state: "new"
              },
              changes: [
                {
                  kind: "direct",
                  property: "VoyageCrew_crew_voyage_outset",
                  changed: "25"
                }
              ]
            },
            {
              kind: "owned",
              property: "Voyage_Outcome",
              ownedEntity: {
                entityRef: {
                  id: "1e8f3585-9d52-4ee6-b5aa-c96962aa2a52",
                  schema: "VoyageOutcome",
                  type: "new"
                },
                data: {},
                state: "new"
              },
              changes: [
                {
                  kind: "linked",
                  property: "VoyageOutcome_particular_outcome_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 2,
                      schema: "ParticularOutcome"
                    },
                    data: {
                      Name: "Shipwrecked or destroyed, before slaves embarked",
                      Value: 2,
                      id: 2
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageOutcome_outcome_slaves_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 2,
                      schema: "SlavesOutcome"
                    },
                    data: {
                      Name: "No slaves embarked",
                      Value: 2,
                      id: 2
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageOutcome_vessel_captured_outcome_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1,
                      schema: "VesselOutcomeSchema"
                    },
                    data: {
                      Name: "Natural hazard",
                      Value: 1,
                      id: 1
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageOutcome_outcome_owner_id",
                  changed: null
                }
              ]
            },
            {
              kind: "owned",
              property: "Voyage_Itinerary",
              ownedEntity: {
                entityRef: {
                  id: "0cc3e475-7e0e-4aec-b243-ad029365b288",
                  schema: "VoyageItinerary",
                  type: "new"
                },
                data: {},
                state: "new"
              },
              changes: [
                {
                  kind: "linked",
                  property: "VoyageItinerary_int_first_port_emb_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1851,
                      schema: "Location"
                    },
                    data: {
                      Name: "Antongil Bay",
                      Code: 60840,
                      id: 1851
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageItinerary_int_first_port_dis_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1822,
                      schema: "Location"
                    },
                    data: {
                      Name: "Cape of Good Hope",
                      Code: 60803,
                      id: 1822
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageItinerary_port_of_departure_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1822,
                      schema: "Location"
                    },
                    data: {
                      Name: "Cape of Good Hope",
                      Code: 60803,
                      id: 1822
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageItinerary_first_place_slave_purchase_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1851,
                      schema: "Location"
                    },
                    data: {
                      Name: "Antongil Bay",
                      Code: 60840,
                      id: 1851
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageItinerary_first_landing_place_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1822,
                      schema: "Location"
                    },
                    data: {
                      Name: "Cape of Good Hope",
                      Code: 60803,
                      id: 1822
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageItinerary_imp_port_voyage_begin_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1822,
                      schema: "Location"
                    },
                    data: {
                      Name: "Cape of Good Hope",
                      Code: 60803,
                      id: 1822
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property:
                    "VoyageItinerary_imp_principal_place_of_slave_purchase_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1851,
                      schema: "Location"
                    },
                    data: {
                      Name: "Antongil Bay",
                      Code: 60840,
                      id: 1851
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageItinerary_imp_principal_port_slave_dis_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1822,
                      schema: "Location"
                    },
                    data: {
                      Name: "Cape of Good Hope",
                      Code: 60803,
                      id: 1822
                    },
                    state: "lazy"
                  }
                }
              ]
            },
            {
              kind: "owned",
              property: "Voyage_Dates",
              ownedEntity: {
                entityRef: {
                  id: "c6df1f4d-bce4-4666-a4d6-cdd13eb8ae9b",
                  schema: "VoyageDates",
                  type: "new"
                },
                data: {},
                state: "new"
              },
              changes: [
                {
                  kind: "linked",
                  property: "VoyageDates_imp_voyage_began_sparsedate_id",
                  changed: {
                    entityRef: {
                      id: "9966e8d5-0743-4240-8ef2-d4324fde2311",
                      schema: "VoyageSparseDate",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  linkedChanges: [
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_year",
                      changed: "1655"
                    }
                  ]
                },
                {
                  kind: "linked",
                  property:
                    "VoyageDates_imp_arrival_at_port_of_dis_sparsedate_id",
                  changed: {
                    entityRef: {
                      id: "de006af7-b114-48d9-a391-11cb29849b6e",
                      schema: "VoyageSparseDate",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  linkedChanges: [
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_year",
                      changed: "1655"
                    }
                  ]
                },
                {
                  kind: "linked",
                  property: "VoyageDates_voyage_began_sparsedate_id",
                  changed: {
                    entityRef: {
                      id: "758fe0b3-3782-4233-80cb-b77441f54cca",
                      schema: "VoyageSparseDate",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  linkedChanges: [
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_year",
                      changed: "1655"
                    },
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_month",
                      changed: "08"
                    },
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_day",
                      changed: "13"
                    }
                  ]
                }
              ]
            },
            {
              kind: "ownedList",
              property: "Voyage_Sources",
              removed: [],
              modified: [
                {
                  kind: "owned",
                  ownedEntity: {
                    entityRef: {
                      id: "741ffef0-e873-44d8-9e3f-55f09f51625b",
                      schema: "Voyage Source Connection",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  changes: [
                    {
                      kind: "linked",
                      property: "Voyage Source Connection_source_id",
                      changed: {
                        entityRef: {
                          type: "existing",
                          id: 19486,
                          schema: "Voyage Source"
                        },
                        data: {
                          Title: "Resolusies van die Politieke Raad",
                          Bibliography: null,
                          Notes: null,
                          id: 19486,
                          "Short reference id": 2717
                        },
                        state: "lazy"
                      }
                    },
                    {
                      kind: "direct",
                      property: "Voyage Source Connection_page_range",
                      changed: "55-57"
                    }
                  ]
                },
                {
                  kind: "owned",
                  ownedEntity: {
                    entityRef: {
                      id: "5ecd8c54-1b6f-4a8a-8060-90a2954a0756",
                      schema: "Voyage Source Connection",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  changes: [
                    {
                      kind: "linked",
                      property: "Voyage Source Connection_source_id",
                      changed: {
                        entityRef: {
                          type: "existing",
                          id: 19532,
                          schema: "Voyage Source"
                        },
                        data: {
                          Title:
                            "Daghregister Gehouden by Den Oppercoopman Jan Anthonisz Van Riebeeck",
                          Bibliography: null,
                          Notes: null,
                          id: 19532,
                          "Short reference id": 2727
                        },
                        state: "lazy"
                      }
                    },
                    {
                      kind: "direct",
                      property: "Voyage Source Connection_page_range",
                      changed: "vol. 1, 334"
                    }
                  ]
                },
                {
                  kind: "owned",
                  ownedEntity: {
                    entityRef: {
                      id: "166038b0-c67f-42de-add4-81e505bc0bf9",
                      schema: "Voyage Source Connection",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  changes: [
                    {
                      kind: "linked",
                      property: "Voyage Source Connection_source_id",
                      changed: {
                        entityRef: {
                          type: "existing",
                          id: 1667,
                          schema: "Voyage Source"
                        },
                        data: {
                          Title:
                            "Precis of the Archives of the Cape of Good Hope",
                          Bibliography:
                            "<div class=\"csl-bib-body\" style=\"line-height: 1.35; padding-left: 1em; text-indent:-1em;\">\r\n  <div class=\"csl-entry\">Leibbrandt, H. C. V., ed. <i>Precis of the Archives of the Cape of Good Hope</i>. 16 vols. Cape Town, ZA: W. A. Richards & sons, n.d.</div>\r\n</div>",
                          Notes:
                            "FULL REF: Leibbrandt, Hendrik Carel Vos (ed.), <i>Precis of the Archives of the Cape of Good Hope</i>, 16 vols. (Cape Town, 1896-1906).       \\DOC TYPE: Published source",
                          id: 1667,
                          "Short reference id": 863
                        },
                        state: "lazy"
                      }
                    },
                    {
                      kind: "direct",
                      property: "Voyage Source Connection_page_range",
                      changed: "Precis, Letters Dispatched, v. 2, 174-183"
                    }
                  ]
                },
                {
                  kind: "owned",
                  ownedEntity: {
                    entityRef: {
                      id: "879df00c-6cb8-4669-86a8-08e9494a03f9",
                      schema: "Voyage Source Connection",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  changes: [
                    {
                      kind: "linked",
                      property: "Voyage Source Connection_source_id",
                      changed: {
                        entityRef: {
                          type: "existing",
                          id: 19532,
                          schema: "Voyage Source"
                        },
                        data: {
                          Title:
                            "Daghregister Gehouden by Den Oppercoopman Jan Anthonisz Van Riebeeck",
                          Bibliography: null,
                          Notes: null,
                          id: 19532,
                          "Short reference id": 2727
                        },
                        state: "lazy"
                      }
                    },
                    {
                      kind: "direct",
                      property: "Voyage Source Connection_page_range",
                      changed: "vol. 2, 116-117"
                    }
                  ]
                }
              ]
            },
            {
              kind: "ownedList",
              property: "Voyage_Enslavement relations",
              removed: [],
              modified: [
                {
                  kind: "owned",
                  ownedEntity: {
                    entityRef: {
                      id: "9966bdcf-8630-4109-bd2c-f68ae5e8b2e0",
                      schema: "EnslavementRelation",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  changes: [
                    {
                      kind: "linked",
                      property: "EnslavementRelation_relation_type_id",
                      changed: {
                        entityRef: {
                          type: "existing",
                          id: 1,
                          schema: "EnslavementRelationType"
                        },
                        data: {
                          "Relation type": "Transaction",
                          id: 1
                        },
                        state: "lazy"
                      }
                    },
                    {
                      kind: "ownedList",
                      property: "EnslavementRelation_Enslavers in relation",
                      removed: [],
                      modified: [
                        {
                          kind: "owned",
                          ownedEntity: {
                            entityRef: {
                              id: "e0f78599-b53a-4b69-98f9-a7f20ebb9b1d",
                              schema: "EnslaverInRelation",
                              type: "new"
                            },
                            data: {},
                            state: "new"
                          },
                          changes: [
                            {
                              kind: "linked",
                              property: "EnslaverInRelation_enslaver_alias_id",
                              changed: {
                                entityRef: {
                                  id: "CanonicalEnslaverAliasId_VOC",
                                  schema: "EnslaverAliasWithIdentity",
                                  type: "new"
                                },
                                data: {},
                                state: "new"
                              },
                              linkedChanges: [
                                {
                                  kind: "direct",
                                  property:
                                    "EnslaverAlias_alias_EnslaverAliasWithIdentity",
                                  changed: "VOC"
                                },
                                {
                                  kind: "linked",
                                  property:
                                    "EnslaverAliasWithIdentity_identity_id",
                                  changed: {
                                    entityRef: {
                                      id: "CanonicalEnslaverIdentityId_VOC",
                                      schema: "Enslaver",
                                      type: "new"
                                    },
                                    data: {},
                                    state: "new"
                                  },
                                  linkedChanges: [
                                    {
                                      kind: "direct",
                                      property: "Enslaver_principal_alias",
                                      changed: "VOC"
                                    }
                                  ]
                                }
                              ]
                            },
                            {
                              kind: "ownedList",
                              property: "EnslaverInRelation_Roles",
                              removed: [],
                              modified: [
                                {
                                  kind: "owned",
                                  ownedEntity: {
                                    entityRef: {
                                      id: "d6985b9f-3fd8-4f5c-b640-102e02210513",
                                      schema: "EnslaverRelationRoleConn",
                                      type: "new"
                                    },
                                    data: {},
                                    state: "new"
                                  },
                                  changes: [
                                    {
                                      kind: "linked",
                                      property:
                                        "EnslaverRelationRoleConn_enslaverrole_id",
                                      changed: {
                                        entityRef: {
                                          type: "existing",
                                          id: 4,
                                          schema: "EnslaverRole"
                                        },
                                        data: {
                                          "Enslaver role": "Seller",
                                          id: 4
                                        },
                                        state: "lazy"
                                      }
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        },
                        {
                          kind: "owned",
                          ownedEntity: {
                            entityRef: {
                              id: "0c86409b-d2db-425f-a41e-9ae5ec5f7031",
                              schema: "EnslaverInRelation",
                              type: "new"
                            },
                            data: {},
                            state: "new"
                          },
                          changes: [
                            {
                              kind: "linked",
                              property: "EnslaverInRelation_enslaver_alias_id",
                              changed: {
                                entityRef: {
                                  id: "CanonicalEnslaverAliasId_Janssen, Cornelis",
                                  schema: "EnslaverAliasWithIdentity",
                                  type: "new"
                                },
                                data: {},
                                state: "new"
                              },
                              linkedChanges: [
                                {
                                  kind: "direct",
                                  property:
                                    "EnslaverAlias_alias_EnslaverAliasWithIdentity",
                                  changed: "Janssen, Cornelis"
                                },
                                {
                                  kind: "linked",
                                  property:
                                    "EnslaverAliasWithIdentity_identity_id",
                                  changed: {
                                    entityRef: {
                                      id: "CanonicalEnslaverIdentityId_Janssen, Cornelis",
                                      schema: "Enslaver",
                                      type: "new"
                                    },
                                    data: {},
                                    state: "new"
                                  },
                                  linkedChanges: [
                                    {
                                      kind: "direct",
                                      property: "Enslaver_principal_alias",
                                      changed: "Janssen, Cornelis"
                                    }
                                  ]
                                }
                              ]
                            },
                            {
                              kind: "ownedList",
                              property: "EnslaverInRelation_Roles",
                              removed: [],
                              modified: [
                                {
                                  kind: "owned",
                                  ownedEntity: {
                                    entityRef: {
                                      id: "5016c2ff-dbbf-4aff-8798-3adda7f1e3f6",
                                      schema: "EnslaverRelationRoleConn",
                                      type: "new"
                                    },
                                    data: {},
                                    state: "new"
                                  },
                                  changes: [
                                    {
                                      kind: "linked",
                                      property:
                                        "EnslaverRelationRoleConn_enslaverrole_id",
                                      changed: {
                                        entityRef: {
                                          type: "existing",
                                          id: 1,
                                          schema: "EnslaverRole"
                                        },
                                        data: {
                                          "Enslaver role": "Captain",
                                          id: 1
                                        },
                                        state: "lazy"
                                      }
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    status: 0,
    reviews: [],
    media: [],
    batch: {
      id: 1,
      title: "Import of Voyage from IOA_Voyages updated sources.csv",
      comments:
        "Batch created for import of Voyage from CSV file IOA_Voyages updated sources.csv",
      published: null
    }
  },
  {
    id: "Voyage.Voyage.500004",
    root: {
      id: "500004",
      schema: "Voyage",
      type: "new"
    },
    changeSet: {
      id: "4b2d4984-adae-4652-bcf8-4b29b54e6710",
      author: "CSV importer script",
      title: "Import of Voyage #500004",
      comments:
        "Imported from CSV file IOA_Voyages updated sources.csv on 2025-07-18T16:29:10.134Z",
      timestamp: 1752856150128,
      changes: [
        {
          type: "update",
          entityRef: {
            id: "500004",
            schema: "Voyage",
            type: "new"
          },
          changes: [
            {
              kind: "direct",
              property: "Voyage_voyage_id",
              changed: "500004"
            },
            {
              kind: "direct",
              property: "Voyage_dataset",
              changed: "3"
            },
            {
              kind: "linked",
              property: "Voyage_voyage_groupings",
              changed: null
            },
            {
              kind: "owned",
              property: "Voyage_Ship",
              ownedEntity: {
                entityRef: {
                  id: "1f1446d7-1b30-49fc-a450-020727a8f647",
                  schema: "VoyageShip",
                  type: "new"
                },
                data: {},
                state: "new"
              },
              changes: [
                {
                  kind: "direct",
                  property: "VoyageShip_ship_name",
                  changed: "Maria"
                },
                {
                  kind: "linked",
                  property: "VoyageShip_nationality_ship_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 8,
                      schema: "Nationality"
                    },
                    data: {
                      "Nation name": "Netherlands",
                      Code: 8,
                      id: 8
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageShip_rig_of_vessel_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 14,
                      schema: "RigOfVessel"
                    },
                    data: {
                      "Rig of vessel": "Yacht",
                      Code: 14,
                      id: 14
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "direct",
                  property: "VoyageShip_tonnage",
                  changed: "120"
                },
                {
                  kind: "direct",
                  property: "VoyageShip_guns_mounted",
                  changed: "12"
                },
                {
                  kind: "linked",
                  property: "VoyageShip_imputed_nationality_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 8,
                      schema: "Nationality"
                    },
                    data: {
                      "Nation name": "Netherlands",
                      Code: 8,
                      id: 8
                    },
                    state: "lazy"
                  }
                }
              ]
            },
            {
              kind: "owned",
              property: "Voyage_Crew",
              ownedEntity: {
                entityRef: {
                  id: "40b5b525-3030-4a31-a4e6-85354c44d1e4",
                  schema: "VoyageCrew",
                  type: "new"
                },
                data: {},
                state: "new"
              },
              changes: [
                {
                  kind: "direct",
                  property: "VoyageCrew_crew_voyage_outset",
                  changed: "30"
                }
              ]
            },
            {
              kind: "owned",
              property: "Voyage_Outcome",
              ownedEntity: {
                entityRef: {
                  id: "6d2a866e-aa88-49c7-a895-9e9e2b4d985d",
                  schema: "VoyageOutcome",
                  type: "new"
                },
                data: {},
                state: "new"
              },
              changes: [
                {
                  kind: "linked",
                  property: "VoyageOutcome_particular_outcome_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 34,
                      schema: "ParticularOutcome"
                    },
                    data: {
                      Name: "Left coast with trading cargo intact",
                      Value: 41,
                      id: 34
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageOutcome_outcome_slaves_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 5,
                      schema: "SlavesOutcome"
                    },
                    data: {
                      Name: "No information on slaves",
                      Value: 6,
                      id: 5
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageOutcome_vessel_captured_outcome_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 13,
                      schema: "VesselOutcomeSchema"
                    },
                    data: {
                      Name: "Not captured",
                      Value: 14,
                      id: 13
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageOutcome_outcome_owner_id",
                  changed: null
                }
              ]
            },
            {
              kind: "owned",
              property: "Voyage_Itinerary",
              ownedEntity: {
                entityRef: {
                  id: "fb517e81-ff1f-4bbe-85f1-66a98349dcdf",
                  schema: "VoyageItinerary",
                  type: "new"
                },
                data: {},
                state: "new"
              },
              changes: [
                {
                  kind: "linked",
                  property: "VoyageItinerary_int_first_port_emb_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1819,
                      schema: "Location"
                    },
                    data: {
                      Name: "West Central Africa and St. Helena, port unspecified",
                      Code: 60799,
                      id: 1819
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageItinerary_port_of_departure_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1822,
                      schema: "Location"
                    },
                    data: {
                      Name: "Cape of Good Hope",
                      Code: 60803,
                      id: 1822
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageItinerary_imp_port_voyage_begin_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1822,
                      schema: "Location"
                    },
                    data: {
                      Name: "Cape of Good Hope",
                      Code: 60803,
                      id: 1822
                    },
                    state: "lazy"
                  }
                }
              ]
            },
            {
              kind: "owned",
              property: "Voyage_Dates",
              ownedEntity: {
                entityRef: {
                  id: "957c3400-8dde-4469-af32-97720461c4cc",
                  schema: "VoyageDates",
                  type: "new"
                },
                data: {},
                state: "new"
              },
              changes: [
                {
                  kind: "linked",
                  property: "VoyageDates_imp_voyage_began_sparsedate_id",
                  changed: {
                    entityRef: {
                      id: "268b5448-1dac-4485-9432-6eee5bb6b145",
                      schema: "VoyageSparseDate",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  linkedChanges: [
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_year",
                      changed: "1658"
                    }
                  ]
                },
                {
                  kind: "linked",
                  property:
                    "VoyageDates_imp_arrival_at_port_of_dis_sparsedate_id",
                  changed: {
                    entityRef: {
                      id: "679df8e9-deb6-4eca-885e-de6b1663d014",
                      schema: "VoyageSparseDate",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  linkedChanges: [
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_year",
                      changed: "1658"
                    }
                  ]
                },
                {
                  kind: "linked",
                  property: "VoyageDates_voyage_began_sparsedate_id",
                  changed: {
                    entityRef: {
                      id: "2798f3f0-138e-4b81-b9fb-803268c8147a",
                      schema: "VoyageSparseDate",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  linkedChanges: [
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_year",
                      changed: "1658"
                    },
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_month",
                      changed: "02"
                    },
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_day",
                      changed: "04"
                    }
                  ]
                },
                {
                  kind: "linked",
                  property: "VoyageDates_voyage_completed_sparsedate_id",
                  changed: {
                    entityRef: {
                      id: "09fe5de2-43ec-46e2-8a36-46785f16fb0a",
                      schema: "VoyageSparseDate",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  linkedChanges: [
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_year",
                      changed: "1658"
                    },
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_month",
                      changed: "05"
                    },
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_day",
                      changed: "29"
                    }
                  ]
                }
              ]
            },
            {
              kind: "owned",
              property: "Voyage_Slave numbers",
              ownedEntity: {
                entityRef: {
                  id: "89f6a384-9388-4ced-8c9f-b5597802e8ea",
                  schema: "VoyageSlaveNumbers",
                  type: "new"
                },
                data: {},
                state: "new"
              },
              changes: [
                {
                  kind: "direct",
                  property: "VoyageSlaveNumbers_imp_total_num_slaves_embarked",
                  changed: "67"
                },
                {
                  kind: "direct",
                  property:
                    "VoyageSlaveNumbers_imp_total_num_slaves_disembarked",
                  changed: "52"
                }
              ]
            },
            {
              kind: "ownedList",
              property: "Voyage_Sources",
              removed: [],
              modified: [
                {
                  kind: "owned",
                  ownedEntity: {
                    entityRef: {
                      id: "27401097-7056-4a01-a846-7af2868bea8c",
                      schema: "Voyage Source Connection",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  changes: [
                    {
                      kind: "linked",
                      property: "Voyage Source Connection_source_id",
                      changed: {
                        entityRef: {
                          type: "existing",
                          id: 19486,
                          schema: "Voyage Source"
                        },
                        data: {
                          Title: "Resolusies van die Politieke Raad",
                          Bibliography: null,
                          Notes: null,
                          id: 19486,
                          "Short reference id": 2717
                        },
                        state: "lazy"
                      }
                    },
                    {
                      kind: "direct",
                      property: "Voyage Source Connection_page_range",
                      changed: "128-30"
                    }
                  ]
                },
                {
                  kind: "owned",
                  ownedEntity: {
                    entityRef: {
                      id: "a0aa6c75-9329-4cdc-b95d-38911c6307b1",
                      schema: "Voyage Source Connection",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  changes: [
                    {
                      kind: "linked",
                      property: "Voyage Source Connection_source_id",
                      changed: {
                        entityRef: {
                          type: "existing",
                          id: 19532,
                          schema: "Voyage Source"
                        },
                        data: {
                          Title:
                            "Daghregister Gehouden by Den Oppercoopman Jan Anthonisz Van Riebeeck",
                          Bibliography: null,
                          Notes: null,
                          id: 19532,
                          "Short reference id": 2727
                        },
                        state: "lazy"
                      }
                    },
                    {
                      kind: "direct",
                      property: "Voyage Source Connection_page_range",
                      changed: "vol. 2, 237-240"
                    }
                  ]
                },
                {
                  kind: "owned",
                  ownedEntity: {
                    entityRef: {
                      id: "50181396-fc85-41b1-9827-a5eaf430843a",
                      schema: "Voyage Source Connection",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  changes: [
                    {
                      kind: "linked",
                      property: "Voyage Source Connection_source_id",
                      changed: {
                        entityRef: {
                          type: "existing",
                          id: 1667,
                          schema: "Voyage Source"
                        },
                        data: {
                          Title:
                            "Precis of the Archives of the Cape of Good Hope",
                          Bibliography:
                            "<div class=\"csl-bib-body\" style=\"line-height: 1.35; padding-left: 1em; text-indent:-1em;\">\r\n  <div class=\"csl-entry\">Leibbrandt, H. C. V., ed. <i>Precis of the Archives of the Cape of Good Hope</i>. 16 vols. Cape Town, ZA: W. A. Richards & sons, n.d.</div>\r\n</div>",
                          Notes:
                            "FULL REF: Leibbrandt, Hendrik Carel Vos (ed.), <i>Precis of the Archives of the Cape of Good Hope</i>, 16 vols. (Cape Town, 1896-1906).       \\DOC TYPE: Published source",
                          id: 1667,
                          "Short reference id": 863
                        },
                        state: "lazy"
                      }
                    },
                    {
                      kind: "direct",
                      property: "Voyage Source Connection_page_range",
                      changed: "Precis, 1649-1662, v. 3, 4-6"
                    }
                  ]
                }
              ]
            },
            {
              kind: "ownedList",
              property: "Voyage_Enslavement relations",
              removed: [],
              modified: [
                {
                  kind: "owned",
                  ownedEntity: {
                    entityRef: {
                      id: "93f9aaff-d502-463d-acb9-1f5a73c5c4c6",
                      schema: "EnslavementRelation",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  changes: [
                    {
                      kind: "linked",
                      property: "EnslavementRelation_relation_type_id",
                      changed: {
                        entityRef: {
                          type: "existing",
                          id: 1,
                          schema: "EnslavementRelationType"
                        },
                        data: {
                          "Relation type": "Transaction",
                          id: 1
                        },
                        state: "lazy"
                      }
                    },
                    {
                      kind: "ownedList",
                      property: "EnslavementRelation_Enslavers in relation",
                      removed: [],
                      modified: [
                        {
                          kind: "owned",
                          ownedEntity: {
                            entityRef: {
                              id: "8aa806d4-407f-459d-a885-5a8aaa9ed72c",
                              schema: "EnslaverInRelation",
                              type: "new"
                            },
                            data: {},
                            state: "new"
                          },
                          changes: [
                            {
                              kind: "linked",
                              property: "EnslaverInRelation_enslaver_alias_id",
                              changed: {
                                entityRef: {
                                  id: "CanonicalEnslaverAliasId_VOC",
                                  schema: "EnslaverAliasWithIdentity",
                                  type: "new"
                                },
                                data: {},
                                state: "new"
                              },
                              linkedChanges: [
                                {
                                  kind: "direct",
                                  property:
                                    "EnslaverAlias_alias_EnslaverAliasWithIdentity",
                                  changed: "VOC"
                                },
                                {
                                  kind: "linked",
                                  property:
                                    "EnslaverAliasWithIdentity_identity_id",
                                  changed: {
                                    entityRef: {
                                      id: "CanonicalEnslaverIdentityId_VOC",
                                      schema: "Enslaver",
                                      type: "new"
                                    },
                                    data: {},
                                    state: "new"
                                  },
                                  linkedChanges: [
                                    {
                                      kind: "direct",
                                      property: "Enslaver_principal_alias",
                                      changed: "VOC"
                                    }
                                  ]
                                }
                              ]
                            },
                            {
                              kind: "ownedList",
                              property: "EnslaverInRelation_Roles",
                              removed: [],
                              modified: [
                                {
                                  kind: "owned",
                                  ownedEntity: {
                                    entityRef: {
                                      id: "560ac652-44b7-487a-a4f8-a6381c8feb39",
                                      schema: "EnslaverRelationRoleConn",
                                      type: "new"
                                    },
                                    data: {},
                                    state: "new"
                                  },
                                  changes: [
                                    {
                                      kind: "linked",
                                      property:
                                        "EnslaverRelationRoleConn_enslaverrole_id",
                                      changed: {
                                        entityRef: {
                                          type: "existing",
                                          id: 4,
                                          schema: "EnslaverRole"
                                        },
                                        data: {
                                          "Enslaver role": "Seller",
                                          id: 4
                                        },
                                        state: "lazy"
                                      }
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        },
                        {
                          kind: "owned",
                          ownedEntity: {
                            entityRef: {
                              id: "a8f71eb1-068b-48a8-9ca7-5d6a39f798ef",
                              schema: "EnslaverInRelation",
                              type: "new"
                            },
                            data: {},
                            state: "new"
                          },
                          changes: [
                            {
                              kind: "linked",
                              property: "EnslaverInRelation_enslaver_alias_id",
                              changed: {
                                entityRef: {
                                  id: "CanonicalEnslaverAliasId_Bordyngh",
                                  schema: "EnslaverAliasWithIdentity",
                                  type: "new"
                                },
                                data: {},
                                state: "new"
                              },
                              linkedChanges: [
                                {
                                  kind: "direct",
                                  property:
                                    "EnslaverAlias_alias_EnslaverAliasWithIdentity",
                                  changed: "Bordyngh"
                                },
                                {
                                  kind: "linked",
                                  property:
                                    "EnslaverAliasWithIdentity_identity_id",
                                  changed: {
                                    entityRef: {
                                      id: "CanonicalEnslaverIdentityId_Bordyngh",
                                      schema: "Enslaver",
                                      type: "new"
                                    },
                                    data: {},
                                    state: "new"
                                  },
                                  linkedChanges: [
                                    {
                                      kind: "direct",
                                      property: "Enslaver_principal_alias",
                                      changed: "Bordyngh"
                                    }
                                  ]
                                }
                              ]
                            },
                            {
                              kind: "ownedList",
                              property: "EnslaverInRelation_Roles",
                              removed: [],
                              modified: [
                                {
                                  kind: "owned",
                                  ownedEntity: {
                                    entityRef: {
                                      id: "f110d6b2-2bc8-47e1-8682-9a8175e5107b",
                                      schema: "EnslaverRelationRoleConn",
                                      type: "new"
                                    },
                                    data: {},
                                    state: "new"
                                  },
                                  changes: [
                                    {
                                      kind: "linked",
                                      property:
                                        "EnslaverRelationRoleConn_enslaverrole_id",
                                      changed: {
                                        entityRef: {
                                          type: "existing",
                                          id: 1,
                                          schema: "EnslaverRole"
                                        },
                                        data: {
                                          "Enslaver role": "Captain",
                                          id: 1
                                        },
                                        state: "lazy"
                                      }
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    status: 0,
    reviews: [],
    media: [],
    batch: {
      id: 1,
      title: "Import of Voyage from IOA_Voyages updated sources.csv",
      comments:
        "Batch created for import of Voyage from CSV file IOA_Voyages updated sources.csv",
      published: null
    }
  },
  {
    id: "Voyage.Voyage.500005",
    root: {
      id: "500005",
      schema: "Voyage",
      type: "new"
    },
    changeSet: {
      id: "503355af-55d5-4d4f-82a9-09863bb08156",
      author: "CSV importer script",
      title: "Import of Voyage #500005",
      comments:
        "Imported from CSV file IOA_Voyages updated sources.csv on 2025-07-18T16:29:10.150Z",
      timestamp: 1752856150144,
      changes: [
        {
          type: "update",
          entityRef: {
            id: "500005",
            schema: "Voyage",
            type: "new"
          },
          changes: [
            {
              kind: "direct",
              property: "Voyage_voyage_id",
              changed: "500005"
            },
            {
              kind: "direct",
              property: "Voyage_dataset",
              changed: "3"
            },
            {
              kind: "linked",
              property: "Voyage_voyage_groupings",
              changed: null
            },
            {
              kind: "owned",
              property: "Voyage_Ship",
              ownedEntity: {
                entityRef: {
                  id: "6e8cf56b-ff27-479f-b4b6-e7102319faf2",
                  schema: "VoyageShip",
                  type: "new"
                },
                data: {},
                state: "new"
              },
              changes: [
                {
                  kind: "direct",
                  property: "VoyageShip_ship_name",
                  changed: "Hasselt"
                },
                {
                  kind: "linked",
                  property: "VoyageShip_nationality_ship_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 8,
                      schema: "Nationality"
                    },
                    data: {
                      "Nation name": "Netherlands",
                      Code: 8,
                      id: 8
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageShip_rig_of_vessel_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 37,
                      schema: "RigOfVessel"
                    },
                    data: {
                      "Rig of vessel": "Pinas",
                      Code: 37,
                      id: 37
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "direct",
                  property: "VoyageShip_tonnage",
                  changed: "365"
                },
                {
                  kind: "linked",
                  property: "VoyageShip_imputed_nationality_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 8,
                      schema: "Nationality"
                    },
                    data: {
                      "Nation name": "Netherlands",
                      Code: 8,
                      id: 8
                    },
                    state: "lazy"
                  }
                }
              ]
            },
            {
              kind: "owned",
              property: "Voyage_Crew",
              ownedEntity: {
                entityRef: {
                  id: "1ea5f00c-10d2-4c79-99dd-bd567343ea83",
                  schema: "VoyageCrew",
                  type: "new"
                },
                data: {},
                state: "new"
              },
              changes: [
                {
                  kind: "direct",
                  property: "VoyageCrew_crew_voyage_outset",
                  changed: "60"
                }
              ]
            },
            {
              kind: "owned",
              property: "Voyage_Outcome",
              ownedEntity: {
                entityRef: {
                  id: "876ae228-dc76-495c-ae24-50ca665e0151",
                  schema: "VoyageOutcome",
                  type: "new"
                },
                data: {},
                state: "new"
              },
              changes: [
                {
                  kind: "linked",
                  property: "VoyageOutcome_particular_outcome_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1,
                      schema: "ParticularOutcome"
                    },
                    data: {
                      Name: "Voyage completed as intended",
                      Value: 1,
                      id: 1
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageOutcome_outcome_slaves_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1,
                      schema: "SlavesOutcome"
                    },
                    data: {
                      Name: "Slaves disembarked in Old World",
                      Value: 3,
                      id: 1
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageOutcome_vessel_captured_outcome_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 13,
                      schema: "VesselOutcomeSchema"
                    },
                    data: {
                      Name: "Not captured",
                      Value: 14,
                      id: 13
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageOutcome_outcome_owner_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1,
                      schema: "OwnerOutcome"
                    },
                    data: {
                      Name: "Delivered slaves for original owners",
                      Value: 1,
                      id: 1
                    },
                    state: "lazy"
                  }
                }
              ]
            },
            {
              kind: "owned",
              property: "Voyage_Itinerary",
              ownedEntity: {
                entityRef: {
                  id: "2d639f7c-5bcd-4ed3-ab11-1520ca7d8612",
                  schema: "VoyageItinerary",
                  type: "new"
                },
                data: {},
                state: "new"
              },
              changes: [
                {
                  kind: "linked",
                  property: "VoyageItinerary_int_first_port_emb_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1701,
                      schema: "Location"
                    },
                    data: {
                      Name: "Benin",
                      Code: 60501,
                      id: 1701
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageItinerary_int_first_port_dis_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1822,
                      schema: "Location"
                    },
                    data: {
                      Name: "Cape of Good Hope",
                      Code: 60803,
                      id: 1822
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageItinerary_port_of_departure_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1822,
                      schema: "Location"
                    },
                    data: {
                      Name: "Cape of Good Hope",
                      Code: 60803,
                      id: 1822
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageItinerary_first_place_slave_purchase_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1710,
                      schema: "Location"
                    },
                    data: {
                      Name: "Popo",
                      Code: 60510,
                      id: 1710
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageItinerary_first_landing_place_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1822,
                      schema: "Location"
                    },
                    data: {
                      Name: "Cape of Good Hope",
                      Code: 60803,
                      id: 1822
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageItinerary_imp_port_voyage_begin_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1822,
                      schema: "Location"
                    },
                    data: {
                      Name: "Cape of Good Hope",
                      Code: 60803,
                      id: 1822
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property:
                    "VoyageItinerary_imp_principal_place_of_slave_purchase_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1710,
                      schema: "Location"
                    },
                    data: {
                      Name: "Popo",
                      Code: 60510,
                      id: 1710
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageItinerary_imp_principal_port_slave_dis_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1822,
                      schema: "Location"
                    },
                    data: {
                      Name: "Cape of Good Hope",
                      Code: 60803,
                      id: 1822
                    },
                    state: "lazy"
                  }
                }
              ]
            },
            {
              kind: "owned",
              property: "Voyage_Dates",
              ownedEntity: {
                entityRef: {
                  id: "0e94210b-a111-4a75-ba85-1c9a08e5ddad",
                  schema: "VoyageDates",
                  type: "new"
                },
                data: {},
                state: "new"
              },
              changes: [
                {
                  kind: "direct",
                  property:
                    "VoyageDates_imp_length_leaving_africa_to_disembark",
                  changed: "73"
                },
                {
                  kind: "linked",
                  property: "VoyageDates_imp_voyage_began_sparsedate_id",
                  changed: {
                    entityRef: {
                      id: "b17acd4b-ac30-4670-bf5a-add366b00d61",
                      schema: "VoyageSparseDate",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  linkedChanges: [
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_year",
                      changed: "1657"
                    }
                  ]
                },
                {
                  kind: "linked",
                  property:
                    "VoyageDates_imp_arrival_at_port_of_dis_sparsedate_id",
                  changed: {
                    entityRef: {
                      id: "a274a8ca-48de-4ec2-b5a7-4036a0e14518",
                      schema: "VoyageSparseDate",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  linkedChanges: [
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_year",
                      changed: "1658"
                    }
                  ]
                },
                {
                  kind: "linked",
                  property: "VoyageDates_voyage_began_sparsedate_id",
                  changed: {
                    entityRef: {
                      id: "123743c3-7048-484a-9e5c-f1818e1e0b17",
                      schema: "VoyageSparseDate",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  linkedChanges: [
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_year",
                      changed: "1657"
                    },
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_month",
                      changed: "09"
                    },
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_day",
                      changed: "10"
                    }
                  ]
                },
                {
                  kind: "linked",
                  property: "VoyageDates_slave_purchase_began_sparsedate_id",
                  changed: {
                    entityRef: {
                      id: "10fe735b-e011-400f-a3d2-ea9af46e9c8b",
                      schema: "VoyageSparseDate",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  linkedChanges: [
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_year",
                      changed: "1657"
                    },
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_month",
                      changed: "12"
                    },
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_day",
                      changed: "15"
                    }
                  ]
                },
                {
                  kind: "linked",
                  property: "VoyageDates_date_departed_africa_sparsedate_id",
                  changed: {
                    entityRef: {
                      id: "394f519d-745c-4b1b-9a6e-ab7379f5668d",
                      schema: "VoyageSparseDate",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  linkedChanges: [
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_year",
                      changed: "1658"
                    },
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_month",
                      changed: "02"
                    },
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_day",
                      changed: "22"
                    }
                  ]
                }
              ]
            },
            {
              kind: "owned",
              property: "Voyage_Slave numbers",
              ownedEntity: {
                entityRef: {
                  id: "0ecbd796-3ac3-451d-9c3e-40ae91ce4036",
                  schema: "VoyageSlaveNumbers",
                  type: "new"
                },
                data: {},
                state: "new"
              },
              changes: [
                {
                  kind: "direct",
                  property: "VoyageSlaveNumbers_num_slaves_carried_first_port",
                  changed: "271"
                },
                {
                  kind: "direct",
                  property: "VoyageSlaveNumbers_num_slaves_carried_second_port",
                  changed: "0"
                },
                {
                  kind: "direct",
                  property: "VoyageSlaveNumbers_num_slaves_carried_third_port",
                  changed: "0"
                },
                {
                  kind: "direct",
                  property: "VoyageSlaveNumbers_total_num_slaves_purchased",
                  changed: "271"
                },
                {
                  kind: "direct",
                  property:
                    "VoyageSlaveNumbers_total_num_slaves_dep_last_slaving_port",
                  changed: "271"
                },
                {
                  kind: "direct",
                  property:
                    "VoyageSlaveNumbers_total_num_slaves_arr_first_port_embark",
                  changed: "226"
                },
                {
                  kind: "direct",
                  property:
                    "VoyageSlaveNumbers_num_slaves_disembark_first_place",
                  changed: "226"
                },
                {
                  kind: "direct",
                  property:
                    "VoyageSlaveNumbers_num_slaves_disembark_second_place",
                  changed: "0"
                },
                {
                  kind: "direct",
                  property:
                    "VoyageSlaveNumbers_num_slaves_disembark_third_place",
                  changed: "0"
                },
                {
                  kind: "direct",
                  property: "VoyageSlaveNumbers_imp_total_num_slaves_embarked",
                  changed: "271"
                },
                {
                  kind: "direct",
                  property:
                    "VoyageSlaveNumbers_imp_total_num_slaves_disembarked",
                  changed: "226"
                },
                {
                  kind: "direct",
                  property: "VoyageSlaveNumbers_imp_mortality_during_voyage",
                  changed: "45"
                },
                {
                  kind: "table",
                  property: "sn_characteristics",
                  changes: {
                    num_men_embark_first_port_purchase: "126",
                    num_women_embark_first_port_purchase: "131",
                    num_boy_embark_first_port_purchase: "7",
                    num_girl_embark_first_port_purchase: "4",
                    num_adult_embark_first_port_purchase: "0",
                    num_child_embark_first_port_purchase: "3",
                    num_infant_embark_first_port_purchase: "0"
                  }
                },
                {
                  kind: "direct",
                  property:
                    "VoyageSlaveNumbers_total_slaves_embarked_age_identified",
                  changed: "271"
                },
                {
                  kind: "direct",
                  property:
                    "VoyageSlaveNumbers_total_slaves_embarked_gender_identified",
                  changed: "268"
                },
                {
                  kind: "direct",
                  property:
                    "VoyageSlaveNumbers_total_slaves_dept_or_arr_age_identified",
                  changed: "271"
                },
                {
                  kind: "direct",
                  property:
                    "VoyageSlaveNumbers_total_slaves_dept_or_arr_gender_identified",
                  changed: "268"
                },
                {
                  kind: "direct",
                  property:
                    "VoyageSlaveNumbers_imp_slaves_embarked_for_mortality",
                  changed: "271"
                },
                {
                  kind: "direct",
                  property:
                    "VoyageSlaveNumbers_total_slaves_embarked_age_gender_identified",
                  changed: "268"
                },
                {
                  kind: "direct",
                  property:
                    "VoyageSlaveNumbers_total_slaves_by_age_gender_identified_departure_or_arrival",
                  changed: "268"
                },
                {
                  kind: "direct",
                  property:
                    "VoyageSlaveNumbers_percentage_boys_among_embarked_slaves",
                  changed: "0.026119403"
                },
                {
                  kind: "direct",
                  property:
                    "VoyageSlaveNumbers_child_ratio_among_embarked_slaves",
                  changed: "0.051660517"
                },
                {
                  kind: "direct",
                  property:
                    "VoyageSlaveNumbers_percentage_girls_among_embarked_slaves",
                  changed: "0.014925373"
                },
                {
                  kind: "direct",
                  property:
                    "VoyageSlaveNumbers_male_ratio_among_embarked_slaves",
                  changed: "0.496268657"
                },
                {
                  kind: "direct",
                  property:
                    "VoyageSlaveNumbers_percentage_men_among_embarked_slaves",
                  changed: "0.470149254"
                },
                {
                  kind: "direct",
                  property:
                    "VoyageSlaveNumbers_percentage_women_among_embarked_slaves",
                  changed: "0.48880597"
                },
                {
                  kind: "direct",
                  property: "VoyageSlaveNumbers_percentage_men",
                  changed: "0.470149254"
                },
                {
                  kind: "direct",
                  property: "VoyageSlaveNumbers_percentage_women",
                  changed: "0.48880597"
                },
                {
                  kind: "direct",
                  property: "VoyageSlaveNumbers_percentage_boy",
                  changed: "0.026119403"
                },
                {
                  kind: "direct",
                  property: "VoyageSlaveNumbers_percentage_girl",
                  changed: "0.014925373"
                },
                {
                  kind: "direct",
                  property: "VoyageSlaveNumbers_percentage_male",
                  changed: "0.496268657"
                },
                {
                  kind: "direct",
                  property: "VoyageSlaveNumbers_percentage_child",
                  changed: "0.051660517"
                },
                {
                  kind: "direct",
                  property: "VoyageSlaveNumbers_imp_mortality_ratio",
                  changed: "0.166051661"
                },
                {
                  kind: "table",
                  property: "sn_characteristics_imputed",
                  changes: {
                    imp_num_adult_embarked: "257",
                    imp_num_children_embarked: "14",
                    imp_num_male_embarked: "133",
                    imp_num_female_embarked: "135",
                    imp_num_men_total: "126",
                    imp_num_women_total: "131",
                    imp_num_boy_total: "7",
                    imp_num_girl_total: "4",
                    imp_num_adult_total: "257",
                    imp_num_child_total: "14",
                    imp_num_males_total: "133",
                    imp_num_females_total: "135"
                  }
                }
              ]
            },
            {
              kind: "ownedList",
              property: "Voyage_Sources",
              removed: [],
              modified: [
                {
                  kind: "owned",
                  ownedEntity: {
                    entityRef: {
                      id: "e7e1b1ee-1a87-4355-8c08-e2d0a6f5e0c2",
                      schema: "Voyage Source Connection",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  changes: [
                    {
                      kind: "linked",
                      property: "Voyage Source Connection_source_id",
                      changed: {
                        entityRef: {
                          type: "existing",
                          id: 14389,
                          schema: "Voyage Source"
                        },
                        data: {
                          Title: "VOC 3993",
                          Bibliography: "VOC 3993",
                          Notes: "Armstrong database",
                          id: 14389,
                          "Short reference id": 1628
                        },
                        state: "lazy"
                      }
                    },
                    {
                      kind: "direct",
                      property: "Voyage Source Connection_page_range",
                      changed: "ff.614-640"
                    }
                  ]
                },
                {
                  kind: "owned",
                  ownedEntity: {
                    entityRef: {
                      id: "fa820547-bc6d-4e86-b75e-8827a12d7c87",
                      schema: "Voyage Source Connection",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  changes: [
                    {
                      kind: "linked",
                      property: "Voyage Source Connection_source_id",
                      changed: {
                        entityRef: {
                          type: "existing",
                          id: 19491,
                          schema: "Voyage Source"
                        },
                        data: {
                          Title: "Beschryvinge Van De Oostindische Compagnie",
                          Bibliography: null,
                          Notes: null,
                          id: 19491,
                          "Short reference id": 2719
                        },
                        state: "lazy"
                      }
                    },
                    {
                      kind: "direct",
                      property: "Voyage Source Connection_page_range",
                      changed:
                        "vol 2.3, GS 83, 532-538, “Secrete geslote instructie…”"
                    }
                  ]
                },
                {
                  kind: "owned",
                  ownedEntity: {
                    entityRef: {
                      id: "21f410c2-061a-4208-94e9-ee9b04d186b4",
                      schema: "Voyage Source Connection",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  changes: [
                    {
                      kind: "linked",
                      property: "Voyage Source Connection_source_id",
                      changed: {
                        entityRef: {
                          type: "existing",
                          id: 14394,
                          schema: "Voyage Source"
                        },
                        data: {
                          Title:
                            "The secret modus operandi used to obtain slaves from Guinea for the Cape: the ship Hasselt, 1658",
                          Bibliography:
                            "The secret modus operandi used to obtain slaves from Guinea for the Cape: the ship Hasselt, 1658",
                          Notes: "",
                          id: 14394,
                          "Short reference id": 1631
                        },
                        state: "lazy"
                      }
                    },
                    {
                      kind: "direct",
                      property: "Voyage Source Connection_page_range",
                      changed: "Hasselt, 78-92"
                    }
                  ]
                }
              ]
            },
            {
              kind: "ownedList",
              property: "Voyage_Enslavement relations",
              removed: [],
              modified: [
                {
                  kind: "owned",
                  ownedEntity: {
                    entityRef: {
                      id: "a1e72e94-68ee-4e83-bbda-7f38cfcfe9eb",
                      schema: "EnslavementRelation",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  changes: [
                    {
                      kind: "linked",
                      property: "EnslavementRelation_relation_type_id",
                      changed: {
                        entityRef: {
                          type: "existing",
                          id: 1,
                          schema: "EnslavementRelationType"
                        },
                        data: {
                          "Relation type": "Transaction",
                          id: 1
                        },
                        state: "lazy"
                      }
                    },
                    {
                      kind: "ownedList",
                      property: "EnslavementRelation_Enslavers in relation",
                      removed: [],
                      modified: [
                        {
                          kind: "owned",
                          ownedEntity: {
                            entityRef: {
                              id: "1e2e6f0a-ff9f-4f50-9010-1bebdab580d0",
                              schema: "EnslaverInRelation",
                              type: "new"
                            },
                            data: {},
                            state: "new"
                          },
                          changes: [
                            {
                              kind: "linked",
                              property: "EnslaverInRelation_enslaver_alias_id",
                              changed: {
                                entityRef: {
                                  id: "CanonicalEnslaverAliasId_VOC",
                                  schema: "EnslaverAliasWithIdentity",
                                  type: "new"
                                },
                                data: {},
                                state: "new"
                              },
                              linkedChanges: [
                                {
                                  kind: "direct",
                                  property:
                                    "EnslaverAlias_alias_EnslaverAliasWithIdentity",
                                  changed: "VOC"
                                },
                                {
                                  kind: "linked",
                                  property:
                                    "EnslaverAliasWithIdentity_identity_id",
                                  changed: {
                                    entityRef: {
                                      id: "CanonicalEnslaverIdentityId_VOC",
                                      schema: "Enslaver",
                                      type: "new"
                                    },
                                    data: {},
                                    state: "new"
                                  },
                                  linkedChanges: [
                                    {
                                      kind: "direct",
                                      property: "Enslaver_principal_alias",
                                      changed: "VOC"
                                    }
                                  ]
                                }
                              ]
                            },
                            {
                              kind: "ownedList",
                              property: "EnslaverInRelation_Roles",
                              removed: [],
                              modified: [
                                {
                                  kind: "owned",
                                  ownedEntity: {
                                    entityRef: {
                                      id: "5868e0af-e124-4cde-969e-f80e3146b407",
                                      schema: "EnslaverRelationRoleConn",
                                      type: "new"
                                    },
                                    data: {},
                                    state: "new"
                                  },
                                  changes: [
                                    {
                                      kind: "linked",
                                      property:
                                        "EnslaverRelationRoleConn_enslaverrole_id",
                                      changed: {
                                        entityRef: {
                                          type: "existing",
                                          id: 4,
                                          schema: "EnslaverRole"
                                        },
                                        data: {
                                          "Enslaver role": "Seller",
                                          id: 4
                                        },
                                        state: "lazy"
                                      }
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        },
                        {
                          kind: "owned",
                          ownedEntity: {
                            entityRef: {
                              id: "b21e0ee0-df70-47e4-bec3-a9f1570d2018",
                              schema: "EnslaverInRelation",
                              type: "new"
                            },
                            data: {},
                            state: "new"
                          },
                          changes: [
                            {
                              kind: "linked",
                              property: "EnslaverInRelation_enslaver_alias_id",
                              changed: {
                                entityRef: {
                                  id: "CanonicalEnslaverAliasId_Moocker",
                                  schema: "EnslaverAliasWithIdentity",
                                  type: "new"
                                },
                                data: {},
                                state: "new"
                              },
                              linkedChanges: [
                                {
                                  kind: "direct",
                                  property:
                                    "EnslaverAlias_alias_EnslaverAliasWithIdentity",
                                  changed: "Moocker"
                                },
                                {
                                  kind: "linked",
                                  property:
                                    "EnslaverAliasWithIdentity_identity_id",
                                  changed: {
                                    entityRef: {
                                      id: "CanonicalEnslaverIdentityId_Moocker",
                                      schema: "Enslaver",
                                      type: "new"
                                    },
                                    data: {},
                                    state: "new"
                                  },
                                  linkedChanges: [
                                    {
                                      kind: "direct",
                                      property: "Enslaver_principal_alias",
                                      changed: "Moocker"
                                    }
                                  ]
                                }
                              ]
                            },
                            {
                              kind: "ownedList",
                              property: "EnslaverInRelation_Roles",
                              removed: [],
                              modified: [
                                {
                                  kind: "owned",
                                  ownedEntity: {
                                    entityRef: {
                                      id: "5db55b18-6f6a-4fed-8e7d-b777952f267c",
                                      schema: "EnslaverRelationRoleConn",
                                      type: "new"
                                    },
                                    data: {},
                                    state: "new"
                                  },
                                  changes: [
                                    {
                                      kind: "linked",
                                      property:
                                        "EnslaverRelationRoleConn_enslaverrole_id",
                                      changed: {
                                        entityRef: {
                                          type: "existing",
                                          id: 1,
                                          schema: "EnslaverRole"
                                        },
                                        data: {
                                          "Enslaver role": "Captain",
                                          id: 1
                                        },
                                        state: "lazy"
                                      }
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    status: 0,
    reviews: [],
    media: [],
    batch: {
      id: 1,
      title: "Import of Voyage from IOA_Voyages updated sources.csv",
      comments:
        "Batch created for import of Voyage from CSV file IOA_Voyages updated sources.csv",
      published: null
    }
  },
  {
    id: "Voyage.Voyage.500006",
    root: {
      id: "500006",
      schema: "Voyage",
      type: "new"
    },
    changeSet: {
      id: "39f1602b-a204-4b04-b264-5f855793e9b6",
      author: "CSV importer script",
      title: "Import of Voyage #500006",
      comments:
        "Imported from CSV file IOA_Voyages updated sources.csv on 2025-07-18T16:29:10.173Z",
      timestamp: 1752856150168,
      changes: [
        {
          type: "update",
          entityRef: {
            id: "500006",
            schema: "Voyage",
            type: "new"
          },
          changes: [
            {
              kind: "direct",
              property: "Voyage_voyage_id",
              changed: "500006"
            },
            {
              kind: "direct",
              property: "Voyage_dataset",
              changed: "3"
            },
            {
              kind: "linked",
              property: "Voyage_voyage_groupings",
              changed: null
            },
            {
              kind: "owned",
              property: "Voyage_Ship",
              ownedEntity: {
                entityRef: {
                  id: "78aa8f4c-d3f4-44b8-94c4-b2ee7817dbd5",
                  schema: "VoyageShip",
                  type: "new"
                },
                data: {},
                state: "new"
              },
              changes: [
                {
                  kind: "direct",
                  property: "VoyageShip_ship_name",
                  changed: "Amersfoort"
                },
                {
                  kind: "linked",
                  property: "VoyageShip_nationality_ship_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 8,
                      schema: "Nationality"
                    },
                    data: {
                      "Nation name": "Netherlands",
                      Code: 8,
                      id: 8
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "direct",
                  property: "VoyageShip_tonnage",
                  changed: "1000"
                },
                {
                  kind: "linked",
                  property: "VoyageShip_imputed_nationality_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 8,
                      schema: "Nationality"
                    },
                    data: {
                      "Nation name": "Netherlands",
                      Code: 8,
                      id: 8
                    },
                    state: "lazy"
                  }
                }
              ]
            },
            {
              kind: "owned",
              property: "Voyage_Crew",
              ownedEntity: {
                entityRef: {
                  id: "cd835455-a13f-4ab3-aac2-a70369dc3ce6",
                  schema: "VoyageCrew",
                  type: "new"
                },
                data: {},
                state: "new"
              },
              changes: [
                {
                  kind: "direct",
                  property: "VoyageCrew_crew_voyage_outset",
                  changed: "323"
                }
              ]
            },
            {
              kind: "owned",
              property: "Voyage_Outcome",
              ownedEntity: {
                entityRef: {
                  id: "0288a8f2-f2d0-4cd7-a08d-720a7bcb6f4c",
                  schema: "VoyageOutcome",
                  type: "new"
                },
                data: {},
                state: "new"
              },
              changes: [
                {
                  kind: "linked",
                  property: "VoyageOutcome_particular_outcome_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1,
                      schema: "ParticularOutcome"
                    },
                    data: {
                      Name: "Voyage completed as intended",
                      Value: 1,
                      id: 1
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageOutcome_outcome_slaves_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1,
                      schema: "SlavesOutcome"
                    },
                    data: {
                      Name: "Slaves disembarked in Old World",
                      Value: 3,
                      id: 1
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageOutcome_vessel_captured_outcome_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 13,
                      schema: "VesselOutcomeSchema"
                    },
                    data: {
                      Name: "Not captured",
                      Value: 14,
                      id: 13
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageOutcome_outcome_owner_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1,
                      schema: "OwnerOutcome"
                    },
                    data: {
                      Name: "Delivered slaves for original owners",
                      Value: 1,
                      id: 1
                    },
                    state: "lazy"
                  }
                }
              ]
            },
            {
              kind: "owned",
              property: "Voyage_Itinerary",
              ownedEntity: {
                entityRef: {
                  id: "4112ca92-0e23-4dd5-affb-394a809b89af",
                  schema: "VoyageItinerary",
                  type: "new"
                },
                data: {},
                state: "new"
              },
              changes: [
                {
                  kind: "linked",
                  property: "VoyageItinerary_first_place_slave_purchase_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1888,
                      schema: "Location"
                    },
                    data: {
                      Name: "Angola (possibly New Calabar)",
                      Code: 60902,
                      id: 1888
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageItinerary_first_landing_place_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1822,
                      schema: "Location"
                    },
                    data: {
                      Name: "Cape of Good Hope",
                      Code: 60803,
                      id: 1822
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageItinerary_second_landing_place_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1995,
                      schema: "Location"
                    },
                    data: {
                      Name: "Batavia",
                      Code: 80413,
                      id: 1995
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property:
                    "VoyageItinerary_imp_principal_place_of_slave_purchase_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1888,
                      schema: "Location"
                    },
                    data: {
                      Name: "Angola (possibly New Calabar)",
                      Code: 60902,
                      id: 1888
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageItinerary_imp_principal_port_slave_dis_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 2070,
                      schema: "Location"
                    },
                    data: {
                      Name: "???",
                      Code: 99801,
                      id: 2070
                    },
                    state: "lazy"
                  }
                }
              ]
            },
            {
              kind: "owned",
              property: "Voyage_Dates",
              ownedEntity: {
                entityRef: {
                  id: "13f3dbfe-91c5-479d-91b3-73226197038c",
                  schema: "VoyageDates",
                  type: "new"
                },
                data: {},
                state: "new"
              },
              changes: [
                {
                  kind: "direct",
                  property:
                    "VoyageDates_imp_length_leaving_africa_to_disembark",
                  changed: "64"
                },
                {
                  kind: "linked",
                  property: "VoyageDates_imp_voyage_began_sparsedate_id",
                  changed: {
                    entityRef: {
                      id: "145dff84-5146-415b-a5e4-874ba51c293f",
                      schema: "VoyageSparseDate",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  linkedChanges: [
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_year",
                      changed: "1657"
                    }
                  ]
                },
                {
                  kind: "linked",
                  property:
                    "VoyageDates_imp_arrival_at_port_of_dis_sparsedate_id",
                  changed: {
                    entityRef: {
                      id: "75d94863-d3f0-4c42-8d67-4eaa0b67dece",
                      schema: "VoyageSparseDate",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  linkedChanges: [
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_year",
                      changed: "1658"
                    }
                  ]
                },
                {
                  kind: "linked",
                  property: "VoyageDates_voyage_began_sparsedate_id",
                  changed: {
                    entityRef: {
                      id: "b3f86884-c5e3-4372-8624-9fee4e7203d4",
                      schema: "VoyageSparseDate",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  linkedChanges: [
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_year",
                      changed: "1657"
                    },
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_month",
                      changed: "12"
                    },
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_day",
                      changed: "14"
                    }
                  ]
                },
                {
                  kind: "linked",
                  property: "VoyageDates_slave_purchase_began_sparsedate_id",
                  changed: {
                    entityRef: {
                      id: "6e24efdf-6070-44e4-8103-c2fd6d9e8790",
                      schema: "VoyageSparseDate",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  linkedChanges: [
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_year",
                      changed: "1658"
                    },
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_month",
                      changed: "01"
                    },
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_day",
                      changed: "23"
                    }
                  ]
                },
                {
                  kind: "linked",
                  property: "VoyageDates_first_dis_of_slaves_sparsedate_id",
                  changed: {
                    entityRef: {
                      id: "69fc7512-cf99-4749-ada3-ddf835187c6d",
                      schema: "VoyageSparseDate",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  linkedChanges: [
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_year",
                      changed: "1658"
                    },
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_month",
                      changed: "03"
                    },
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_day",
                      changed: "28"
                    }
                  ]
                }
              ]
            },
            {
              kind: "owned",
              property: "Voyage_Slave numbers",
              ownedEntity: {
                entityRef: {
                  id: "72c5968e-5b6c-43af-acdd-c99e7469a06f",
                  schema: "VoyageSlaveNumbers",
                  type: "new"
                },
                data: {},
                state: "new"
              },
              changes: [
                {
                  kind: "direct",
                  property:
                    "VoyageSlaveNumbers_slave_deaths_between_africa_america",
                  changed: "76"
                },
                {
                  kind: "direct",
                  property: "VoyageSlaveNumbers_total_num_slaves_purchased",
                  changed: "250"
                },
                {
                  kind: "direct",
                  property:
                    "VoyageSlaveNumbers_total_num_slaves_arr_first_port_embark",
                  changed: "174"
                },
                {
                  kind: "direct",
                  property: "VoyageSlaveNumbers_imp_total_num_slaves_embarked",
                  changed: "250"
                },
                {
                  kind: "direct",
                  property:
                    "VoyageSlaveNumbers_imp_total_num_slaves_disembarked",
                  changed: "174"
                },
                {
                  kind: "direct",
                  property: "VoyageSlaveNumbers_imp_mortality_during_voyage",
                  changed: "76"
                },
                {
                  kind: "direct",
                  property:
                    "VoyageSlaveNumbers_imp_slaves_embarked_for_mortality",
                  changed: "250"
                },
                {
                  kind: "direct",
                  property: "VoyageSlaveNumbers_imp_mortality_ratio",
                  changed: "0.304"
                }
              ]
            },
            {
              kind: "ownedList",
              property: "Voyage_Sources",
              removed: [],
              modified: [
                {
                  kind: "owned",
                  ownedEntity: {
                    entityRef: {
                      id: "b5fea32f-5a93-47bf-8b2b-6421206609b1",
                      schema: "Voyage Source Connection",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  changes: [
                    {
                      kind: "linked",
                      property: "Voyage Source Connection_source_id",
                      changed: {
                        entityRef: {
                          type: "existing",
                          id: 19486,
                          schema: "Voyage Source"
                        },
                        data: {
                          Title: "Resolusies van die Politieke Raad",
                          Bibliography: null,
                          Notes: null,
                          id: 19486,
                          "Short reference id": 2717
                        },
                        state: "lazy"
                      }
                    },
                    {
                      kind: "direct",
                      property: "Voyage Source Connection_page_range",
                      changed: "139"
                    }
                  ]
                },
                {
                  kind: "owned",
                  ownedEntity: {
                    entityRef: {
                      id: "897bca81-c0ff-4b45-beb7-fb13440e66a4",
                      schema: "Voyage Source Connection",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  changes: [
                    {
                      kind: "linked",
                      property: "Voyage Source Connection_source_id",
                      changed: {
                        entityRef: {
                          type: "existing",
                          id: 19532,
                          schema: "Voyage Source"
                        },
                        data: {
                          Title:
                            "Daghregister Gehouden by Den Oppercoopman Jan Anthonisz Van Riebeeck",
                          Bibliography: null,
                          Notes: null,
                          id: 19532,
                          "Short reference id": 2727
                        },
                        state: "lazy"
                      }
                    },
                    {
                      kind: "direct",
                      property: "Voyage Source Connection_page_range",
                      changed: "vol. 2, 268-269"
                    }
                  ]
                },
                {
                  kind: "owned",
                  ownedEntity: {
                    entityRef: {
                      id: "ebf0d4f7-616c-41d2-a537-8140717e3eb4",
                      schema: "Voyage Source Connection",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  changes: [
                    {
                      kind: "linked",
                      property: "Voyage Source Connection_source_id",
                      changed: {
                        entityRef: {
                          type: "existing",
                          id: 1065,
                          schema: "Voyage Source"
                        },
                        data: {
                          Title:
                            "Slaves and Free Blacks at the Cape, 1658-1700",
                          Bibliography:
                            "<div class=\"csl-bib-body\" style=\"line-height: 1.35; padding-left: 1em; text-indent:-1em;\">\r\n  <div class=\"csl-entry\">Böeseken, A. J. <i>Slaves and Free Blacks at the Cape, 1658-1700</i>. 1st Edition. Cape Town, ZA: Tafelberg, 1977.</div>\r\n</div>",
                          Notes:
                            "FULL REF: <p>B&ouml;eseken, A. J., <em>Slaves and Free Blacks at the Cape, 1658-1700</em> (Capetown, 1977).</p>\\DOC TYPE: Published source",
                          id: 1065,
                          "Short reference id": 262
                        },
                        state: "lazy"
                      }
                    },
                    {
                      kind: "direct",
                      property: "Voyage Source Connection_page_range",
                      changed: "11-12"
                    }
                  ]
                }
              ]
            },
            {
              kind: "ownedList",
              property: "Voyage_Enslavement relations",
              removed: [],
              modified: [
                {
                  kind: "owned",
                  ownedEntity: {
                    entityRef: {
                      id: "70dbe7ad-587d-4621-90d8-709171110329",
                      schema: "EnslavementRelation",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  changes: [
                    {
                      kind: "linked",
                      property: "EnslavementRelation_relation_type_id",
                      changed: {
                        entityRef: {
                          type: "existing",
                          id: 1,
                          schema: "EnslavementRelationType"
                        },
                        data: {
                          "Relation type": "Transaction",
                          id: 1
                        },
                        state: "lazy"
                      }
                    },
                    {
                      kind: "ownedList",
                      property: "EnslavementRelation_Enslavers in relation",
                      removed: [],
                      modified: [
                        {
                          kind: "owned",
                          ownedEntity: {
                            entityRef: {
                              id: "fdf74e1b-e9ba-4020-9211-37e16695325d",
                              schema: "EnslaverInRelation",
                              type: "new"
                            },
                            data: {},
                            state: "new"
                          },
                          changes: [
                            {
                              kind: "linked",
                              property: "EnslaverInRelation_enslaver_alias_id",
                              changed: {
                                entityRef: {
                                  id: "CanonicalEnslaverAliasId_VOC",
                                  schema: "EnslaverAliasWithIdentity",
                                  type: "new"
                                },
                                data: {},
                                state: "new"
                              },
                              linkedChanges: [
                                {
                                  kind: "direct",
                                  property:
                                    "EnslaverAlias_alias_EnslaverAliasWithIdentity",
                                  changed: "VOC"
                                },
                                {
                                  kind: "linked",
                                  property:
                                    "EnslaverAliasWithIdentity_identity_id",
                                  changed: {
                                    entityRef: {
                                      id: "CanonicalEnslaverIdentityId_VOC",
                                      schema: "Enslaver",
                                      type: "new"
                                    },
                                    data: {},
                                    state: "new"
                                  },
                                  linkedChanges: [
                                    {
                                      kind: "direct",
                                      property: "Enslaver_principal_alias",
                                      changed: "VOC"
                                    }
                                  ]
                                }
                              ]
                            },
                            {
                              kind: "ownedList",
                              property: "EnslaverInRelation_Roles",
                              removed: [],
                              modified: [
                                {
                                  kind: "owned",
                                  ownedEntity: {
                                    entityRef: {
                                      id: "cc029a62-8d9f-4829-b49f-aef24970ce6d",
                                      schema: "EnslaverRelationRoleConn",
                                      type: "new"
                                    },
                                    data: {},
                                    state: "new"
                                  },
                                  changes: [
                                    {
                                      kind: "linked",
                                      property:
                                        "EnslaverRelationRoleConn_enslaverrole_id",
                                      changed: {
                                        entityRef: {
                                          type: "existing",
                                          id: 4,
                                          schema: "EnslaverRole"
                                        },
                                        data: {
                                          "Enslaver role": "Seller",
                                          id: 4
                                        },
                                        state: "lazy"
                                      }
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        },
                        {
                          kind: "owned",
                          ownedEntity: {
                            entityRef: {
                              id: "ff9f003e-e79a-4d7b-8c67-40313e438f10",
                              schema: "EnslaverInRelation",
                              type: "new"
                            },
                            data: {},
                            state: "new"
                          },
                          changes: [
                            {
                              kind: "linked",
                              property: "EnslaverInRelation_enslaver_alias_id",
                              changed: {
                                entityRef: {
                                  id: "CanonicalEnslaverAliasId_Eldense",
                                  schema: "EnslaverAliasWithIdentity",
                                  type: "new"
                                },
                                data: {},
                                state: "new"
                              },
                              linkedChanges: [
                                {
                                  kind: "direct",
                                  property:
                                    "EnslaverAlias_alias_EnslaverAliasWithIdentity",
                                  changed: "Eldense"
                                },
                                {
                                  kind: "linked",
                                  property:
                                    "EnslaverAliasWithIdentity_identity_id",
                                  changed: {
                                    entityRef: {
                                      id: "CanonicalEnslaverIdentityId_Eldense",
                                      schema: "Enslaver",
                                      type: "new"
                                    },
                                    data: {},
                                    state: "new"
                                  },
                                  linkedChanges: [
                                    {
                                      kind: "direct",
                                      property: "Enslaver_principal_alias",
                                      changed: "Eldense"
                                    }
                                  ]
                                }
                              ]
                            },
                            {
                              kind: "ownedList",
                              property: "EnslaverInRelation_Roles",
                              removed: [],
                              modified: [
                                {
                                  kind: "owned",
                                  ownedEntity: {
                                    entityRef: {
                                      id: "a0802197-e495-402d-a85d-50cb09374f3f",
                                      schema: "EnslaverRelationRoleConn",
                                      type: "new"
                                    },
                                    data: {},
                                    state: "new"
                                  },
                                  changes: [
                                    {
                                      kind: "linked",
                                      property:
                                        "EnslaverRelationRoleConn_enslaverrole_id",
                                      changed: {
                                        entityRef: {
                                          type: "existing",
                                          id: 1,
                                          schema: "EnslaverRole"
                                        },
                                        data: {
                                          "Enslaver role": "Captain",
                                          id: 1
                                        },
                                        state: "lazy"
                                      }
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    status: 0,
    reviews: [],
    media: [],
    batch: {
      id: 1,
      title: "Import of Voyage from IOA_Voyages updated sources.csv",
      comments:
        "Batch created for import of Voyage from CSV file IOA_Voyages updated sources.csv",
      published: null
    }
  },
  {
    id: "Voyage.Voyage.500007",
    root: {
      id: "500007",
      schema: "Voyage",
      type: "new"
    },
    changeSet: {
      id: "4ade9242-f040-4084-9da8-ace09e7c4438",
      author: "CSV importer script",
      title: "Import of Voyage #500007",
      comments:
        "Imported from CSV file IOA_Voyages updated sources.csv on 2025-07-18T16:29:10.192Z",
      timestamp: 1752856150187,
      changes: [
        {
          type: "update",
          entityRef: {
            id: "500007",
            schema: "Voyage",
            type: "new"
          },
          changes: [
            {
              kind: "direct",
              property: "Voyage_voyage_id",
              changed: "500007"
            },
            {
              kind: "direct",
              property: "Voyage_dataset",
              changed: "3"
            },
            {
              kind: "linked",
              property: "Voyage_voyage_groupings",
              changed: null
            },
            {
              kind: "owned",
              property: "Voyage_Ship",
              ownedEntity: {
                entityRef: {
                  id: "166e0844-5222-45c1-8473-ba7893b4b57f",
                  schema: "VoyageShip",
                  type: "new"
                },
                data: {},
                state: "new"
              },
              changes: [
                {
                  kind: "direct",
                  property: "VoyageShip_ship_name",
                  changed: "Postillon"
                },
                {
                  kind: "linked",
                  property: "VoyageShip_nationality_ship_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 8,
                      schema: "Nationality"
                    },
                    data: {
                      "Nation name": "Netherlands",
                      Code: 8,
                      id: 8
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageShip_rig_of_vessel_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 32,
                      schema: "RigOfVessel"
                    },
                    data: {
                      "Rig of vessel": "Fluit",
                      Code: 32,
                      id: 32
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageShip_imputed_nationality_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 8,
                      schema: "Nationality"
                    },
                    data: {
                      "Nation name": "Netherlands",
                      Code: 8,
                      id: 8
                    },
                    state: "lazy"
                  }
                }
              ]
            },
            {
              kind: "owned",
              property: "Voyage_Outcome",
              ownedEntity: {
                entityRef: {
                  id: "427322ae-e95b-4cfc-827e-a1aaf807e5a7",
                  schema: "VoyageOutcome",
                  type: "new"
                },
                data: {},
                state: "new"
              },
              changes: [
                {
                  kind: "linked",
                  property: "VoyageOutcome_particular_outcome_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1,
                      schema: "ParticularOutcome"
                    },
                    data: {
                      Name: "Voyage completed as intended",
                      Value: 1,
                      id: 1
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageOutcome_outcome_slaves_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1,
                      schema: "SlavesOutcome"
                    },
                    data: {
                      Name: "Slaves disembarked in Old World",
                      Value: 3,
                      id: 1
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageOutcome_vessel_captured_outcome_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 13,
                      schema: "VesselOutcomeSchema"
                    },
                    data: {
                      Name: "Not captured",
                      Value: 14,
                      id: 13
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageOutcome_outcome_owner_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1,
                      schema: "OwnerOutcome"
                    },
                    data: {
                      Name: "Delivered slaves for original owners",
                      Value: 1,
                      id: 1
                    },
                    state: "lazy"
                  }
                }
              ]
            },
            {
              kind: "owned",
              property: "Voyage_Itinerary",
              ownedEntity: {
                entityRef: {
                  id: "7a2fc28c-f886-41c9-9492-eff5936f7e7c",
                  schema: "VoyageItinerary",
                  type: "new"
                },
                data: {},
                state: "new"
              },
              changes: [
                {
                  kind: "linked",
                  property: "VoyageItinerary_int_first_port_emb_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1832,
                      schema: "Location"
                    },
                    data: {
                      Name: "Port Dauphin, Fort Dauphin",
                      Code: 60814,
                      id: 1832
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageItinerary_int_second_port_emb_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1851,
                      schema: "Location"
                    },
                    data: {
                      Name: "Antongil Bay",
                      Code: 60840,
                      id: 1851
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageItinerary_int_first_port_dis_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1822,
                      schema: "Location"
                    },
                    data: {
                      Name: "Cape of Good Hope",
                      Code: 60803,
                      id: 1822
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageItinerary_port_of_departure_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1995,
                      schema: "Location"
                    },
                    data: {
                      Name: "Batavia",
                      Code: 80413,
                      id: 1995
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageItinerary_first_place_slave_purchase_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1829,
                      schema: "Location"
                    },
                    data: {
                      Name: "Madagascar",
                      Code: 60811,
                      id: 1829
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageItinerary_first_landing_place_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1995,
                      schema: "Location"
                    },
                    data: {
                      Name: "Batavia",
                      Code: 80413,
                      id: 1995
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageItinerary_imp_port_voyage_begin_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1995,
                      schema: "Location"
                    },
                    data: {
                      Name: "Batavia",
                      Code: 80413,
                      id: 1995
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property:
                    "VoyageItinerary_imp_principal_place_of_slave_purchase_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1829,
                      schema: "Location"
                    },
                    data: {
                      Name: "Madagascar",
                      Code: 60811,
                      id: 1829
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageItinerary_imp_principal_port_slave_dis_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1995,
                      schema: "Location"
                    },
                    data: {
                      Name: "Batavia",
                      Code: 80413,
                      id: 1995
                    },
                    state: "lazy"
                  }
                }
              ]
            },
            {
              kind: "owned",
              property: "Voyage_Dates",
              ownedEntity: {
                entityRef: {
                  id: "3f404dcb-345f-45e4-b5d4-49136b290c92",
                  schema: "VoyageDates",
                  type: "new"
                },
                data: {},
                state: "new"
              },
              changes: [
                {
                  kind: "direct",
                  property:
                    "VoyageDates_imp_length_leaving_africa_to_disembark",
                  changed: "149"
                },
                {
                  kind: "linked",
                  property: "VoyageDates_imp_voyage_began_sparsedate_id",
                  changed: {
                    entityRef: {
                      id: "eca1ee99-5798-4a3b-836f-1ce81184dc5c",
                      schema: "VoyageSparseDate",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  linkedChanges: [
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_year",
                      changed: "1661"
                    }
                  ]
                },
                {
                  kind: "linked",
                  property:
                    "VoyageDates_imp_arrival_at_port_of_dis_sparsedate_id",
                  changed: {
                    entityRef: {
                      id: "5e4b9b46-7f73-49f4-b1ba-96c4a1bf156f",
                      schema: "VoyageSparseDate",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  linkedChanges: [
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_year",
                      changed: "1661"
                    }
                  ]
                },
                {
                  kind: "linked",
                  property: "VoyageDates_voyage_began_sparsedate_id",
                  changed: {
                    entityRef: {
                      id: "98e2ec7a-070d-4247-9e4d-0da11e38aff7",
                      schema: "VoyageSparseDate",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  linkedChanges: [
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_year",
                      changed: "1661"
                    },
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_month",
                      changed: "02"
                    },
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_day",
                      changed: "13"
                    }
                  ]
                },
                {
                  kind: "linked",
                  property: "VoyageDates_date_departed_africa_sparsedate_id",
                  changed: {
                    entityRef: {
                      id: "813bb3b9-fea5-4e82-ba20-06c113e22b69",
                      schema: "VoyageSparseDate",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  linkedChanges: [
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_year",
                      changed: "1661"
                    },
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_month",
                      changed: "05"
                    },
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_day",
                      changed: "19"
                    }
                  ]
                },
                {
                  kind: "linked",
                  property: "VoyageDates_first_dis_of_slaves_sparsedate_id",
                  changed: {
                    entityRef: {
                      id: "8729853a-d8a4-4755-a53d-13d8b5df6b37",
                      schema: "VoyageSparseDate",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  linkedChanges: [
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_year",
                      changed: "1661"
                    },
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_month",
                      changed: "10"
                    },
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_day",
                      changed: "15"
                    }
                  ]
                }
              ]
            },
            {
              kind: "owned",
              property: "Voyage_Slave numbers",
              ownedEntity: {
                entityRef: {
                  id: "b4eeac59-ee79-4ea7-8cae-79bd3810b048",
                  schema: "VoyageSlaveNumbers",
                  type: "new"
                },
                data: {},
                state: "new"
              },
              changes: [
                {
                  kind: "direct",
                  property:
                    "VoyageSlaveNumbers_slave_deaths_between_africa_america",
                  changed: "141"
                },
                {
                  kind: "direct",
                  property: "VoyageSlaveNumbers_num_slaves_carried_first_port",
                  changed: "170"
                },
                {
                  kind: "direct",
                  property: "VoyageSlaveNumbers_num_slaves_carried_second_port",
                  changed: "0"
                },
                {
                  kind: "direct",
                  property: "VoyageSlaveNumbers_num_slaves_carried_third_port",
                  changed: "0"
                },
                {
                  kind: "direct",
                  property:
                    "VoyageSlaveNumbers_num_slaves_disembark_first_place",
                  changed: "29"
                },
                {
                  kind: "direct",
                  property:
                    "VoyageSlaveNumbers_num_slaves_disembark_second_place",
                  changed: "0"
                },
                {
                  kind: "direct",
                  property:
                    "VoyageSlaveNumbers_num_slaves_disembark_third_place",
                  changed: "0"
                },
                {
                  kind: "direct",
                  property: "VoyageSlaveNumbers_imp_total_num_slaves_embarked",
                  changed: "170"
                },
                {
                  kind: "direct",
                  property:
                    "VoyageSlaveNumbers_imp_total_num_slaves_disembarked",
                  changed: "29"
                },
                {
                  kind: "direct",
                  property: "VoyageSlaveNumbers_imp_mortality_during_voyage",
                  changed: "141"
                }
              ]
            },
            {
              kind: "ownedList",
              property: "Voyage_Sources",
              removed: [],
              modified: [
                {
                  kind: "owned",
                  ownedEntity: {
                    entityRef: {
                      id: "92312aba-011e-45a7-8703-73b2b86d3e62",
                      schema: "Voyage Source Connection",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  changes: [
                    {
                      kind: "linked",
                      property: "Voyage Source Connection_source_id",
                      changed: {
                        entityRef: {
                          type: "existing",
                          id: 19525,
                          schema: "Voyage Source"
                        },
                        data: {
                          Title:
                            "Dagh-Register gehouden int Casteel Batavia…1661",
                          Bibliography: null,
                          Notes: null,
                          id: 19525,
                          "Short reference id": 2725
                        },
                        state: "lazy"
                      }
                    },
                    {
                      kind: "direct",
                      property: "Voyage Source Connection_page_range",
                      changed: "306-310"
                    }
                  ]
                }
              ]
            },
            {
              kind: "ownedList",
              property: "Voyage_Enslavement relations",
              removed: [],
              modified: [
                {
                  kind: "owned",
                  ownedEntity: {
                    entityRef: {
                      id: "8244329a-d8d9-4617-bb84-333ddd7fbc16",
                      schema: "EnslavementRelation",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  changes: [
                    {
                      kind: "linked",
                      property: "EnslavementRelation_relation_type_id",
                      changed: {
                        entityRef: {
                          type: "existing",
                          id: 1,
                          schema: "EnslavementRelationType"
                        },
                        data: {
                          "Relation type": "Transaction",
                          id: 1
                        },
                        state: "lazy"
                      }
                    },
                    {
                      kind: "ownedList",
                      property: "EnslavementRelation_Enslavers in relation",
                      removed: [],
                      modified: [
                        {
                          kind: "owned",
                          ownedEntity: {
                            entityRef: {
                              id: "79b4ad99-5d74-48fb-88f6-c45e7b309844",
                              schema: "EnslaverInRelation",
                              type: "new"
                            },
                            data: {},
                            state: "new"
                          },
                          changes: [
                            {
                              kind: "linked",
                              property: "EnslaverInRelation_enslaver_alias_id",
                              changed: {
                                entityRef: {
                                  id: "CanonicalEnslaverAliasId_VOC",
                                  schema: "EnslaverAliasWithIdentity",
                                  type: "new"
                                },
                                data: {},
                                state: "new"
                              },
                              linkedChanges: [
                                {
                                  kind: "direct",
                                  property:
                                    "EnslaverAlias_alias_EnslaverAliasWithIdentity",
                                  changed: "VOC"
                                },
                                {
                                  kind: "linked",
                                  property:
                                    "EnslaverAliasWithIdentity_identity_id",
                                  changed: {
                                    entityRef: {
                                      id: "CanonicalEnslaverIdentityId_VOC",
                                      schema: "Enslaver",
                                      type: "new"
                                    },
                                    data: {},
                                    state: "new"
                                  },
                                  linkedChanges: [
                                    {
                                      kind: "direct",
                                      property: "Enslaver_principal_alias",
                                      changed: "VOC"
                                    }
                                  ]
                                }
                              ]
                            },
                            {
                              kind: "ownedList",
                              property: "EnslaverInRelation_Roles",
                              removed: [],
                              modified: [
                                {
                                  kind: "owned",
                                  ownedEntity: {
                                    entityRef: {
                                      id: "7336c29e-7086-42c7-b680-2e9e67017e34",
                                      schema: "EnslaverRelationRoleConn",
                                      type: "new"
                                    },
                                    data: {},
                                    state: "new"
                                  },
                                  changes: [
                                    {
                                      kind: "linked",
                                      property:
                                        "EnslaverRelationRoleConn_enslaverrole_id",
                                      changed: {
                                        entityRef: {
                                          type: "existing",
                                          id: 4,
                                          schema: "EnslaverRole"
                                        },
                                        data: {
                                          "Enslaver role": "Seller",
                                          id: 4
                                        },
                                        state: "lazy"
                                      }
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        },
                        {
                          kind: "owned",
                          ownedEntity: {
                            entityRef: {
                              id: "05a2c1a4-9ff3-4245-8a66-f09677f03146",
                              schema: "EnslaverInRelation",
                              type: "new"
                            },
                            data: {},
                            state: "new"
                          },
                          changes: [
                            {
                              kind: "linked",
                              property: "EnslaverInRelation_enslaver_alias_id",
                              changed: {
                                entityRef: {
                                  id: "CanonicalEnslaverAliasId_Bollan",
                                  schema: "EnslaverAliasWithIdentity",
                                  type: "new"
                                },
                                data: {},
                                state: "new"
                              },
                              linkedChanges: [
                                {
                                  kind: "direct",
                                  property:
                                    "EnslaverAlias_alias_EnslaverAliasWithIdentity",
                                  changed: "Bollan"
                                },
                                {
                                  kind: "linked",
                                  property:
                                    "EnslaverAliasWithIdentity_identity_id",
                                  changed: {
                                    entityRef: {
                                      id: "CanonicalEnslaverIdentityId_Bollan",
                                      schema: "Enslaver",
                                      type: "new"
                                    },
                                    data: {},
                                    state: "new"
                                  },
                                  linkedChanges: [
                                    {
                                      kind: "direct",
                                      property: "Enslaver_principal_alias",
                                      changed: "Bollan"
                                    }
                                  ]
                                }
                              ]
                            },
                            {
                              kind: "ownedList",
                              property: "EnslaverInRelation_Roles",
                              removed: [],
                              modified: [
                                {
                                  kind: "owned",
                                  ownedEntity: {
                                    entityRef: {
                                      id: "9e39e533-91b5-47f8-af73-4318ab889b71",
                                      schema: "EnslaverRelationRoleConn",
                                      type: "new"
                                    },
                                    data: {},
                                    state: "new"
                                  },
                                  changes: [
                                    {
                                      kind: "linked",
                                      property:
                                        "EnslaverRelationRoleConn_enslaverrole_id",
                                      changed: {
                                        entityRef: {
                                          type: "existing",
                                          id: 1,
                                          schema: "EnslaverRole"
                                        },
                                        data: {
                                          "Enslaver role": "Captain",
                                          id: 1
                                        },
                                        state: "lazy"
                                      }
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    status: 0,
    reviews: [],
    media: [],
    batch: {
      id: 1,
      title: "Import of Voyage from IOA_Voyages updated sources.csv",
      comments:
        "Batch created for import of Voyage from CSV file IOA_Voyages updated sources.csv",
      published: null
    }
  },
  {
    id: "Voyage.Voyage.500008",
    root: {
      id: "500008",
      schema: "Voyage",
      type: "new"
    },
    changeSet: {
      id: "c1809db3-71d3-40a0-8a0c-6dcc7f06949c",
      author: "CSV importer script",
      title: "Import of Voyage #500008",
      comments:
        "Imported from CSV file IOA_Voyages updated sources.csv on 2025-07-18T16:29:10.209Z",
      timestamp: 1752856150205,
      changes: [
        {
          type: "update",
          entityRef: {
            id: "500008",
            schema: "Voyage",
            type: "new"
          },
          changes: [
            {
              kind: "direct",
              property: "Voyage_voyage_id",
              changed: "500008"
            },
            {
              kind: "direct",
              property: "Voyage_dataset",
              changed: "3"
            },
            {
              kind: "linked",
              property: "Voyage_voyage_groupings",
              changed: null
            },
            {
              kind: "owned",
              property: "Voyage_Ship",
              ownedEntity: {
                entityRef: {
                  id: "e2ac0f51-c139-4788-9a0c-b6a0777a5253",
                  schema: "VoyageShip",
                  type: "new"
                },
                data: {},
                state: "new"
              },
              changes: [
                {
                  kind: "direct",
                  property: "VoyageShip_ship_name",
                  changed: "Waterhoen"
                },
                {
                  kind: "linked",
                  property: "VoyageShip_nationality_ship_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 8,
                      schema: "Nationality"
                    },
                    data: {
                      "Nation name": "Netherlands",
                      Code: 8,
                      id: 8
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageShip_rig_of_vessel_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 32,
                      schema: "RigOfVessel"
                    },
                    data: {
                      "Rig of vessel": "Fluit",
                      Code: 32,
                      id: 32
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "direct",
                  property: "VoyageShip_tonnage",
                  changed: "193"
                },
                {
                  kind: "linked",
                  property: "VoyageShip_imputed_nationality_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 8,
                      schema: "Nationality"
                    },
                    data: {
                      "Nation name": "Netherlands",
                      Code: 8,
                      id: 8
                    },
                    state: "lazy"
                  }
                }
              ]
            },
            {
              kind: "owned",
              property: "Voyage_Crew",
              ownedEntity: {
                entityRef: {
                  id: "936aebf9-8396-48f7-846e-ca09e510cec2",
                  schema: "VoyageCrew",
                  type: "new"
                },
                data: {},
                state: "new"
              },
              changes: [
                {
                  kind: "direct",
                  property: "VoyageCrew_crew_voyage_outset",
                  changed: "35"
                }
              ]
            },
            {
              kind: "owned",
              property: "Voyage_Outcome",
              ownedEntity: {
                entityRef: {
                  id: "873e23f0-01c7-4544-b346-385b2a9cecb5",
                  schema: "VoyageOutcome",
                  type: "new"
                },
                data: {},
                state: "new"
              },
              changes: [
                {
                  kind: "linked",
                  property: "VoyageOutcome_particular_outcome_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1,
                      schema: "ParticularOutcome"
                    },
                    data: {
                      Name: "Voyage completed as intended",
                      Value: 1,
                      id: 1
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageOutcome_outcome_slaves_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1,
                      schema: "SlavesOutcome"
                    },
                    data: {
                      Name: "Slaves disembarked in Old World",
                      Value: 3,
                      id: 1
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageOutcome_vessel_captured_outcome_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 13,
                      schema: "VesselOutcomeSchema"
                    },
                    data: {
                      Name: "Not captured",
                      Value: 14,
                      id: 13
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageOutcome_outcome_owner_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1,
                      schema: "OwnerOutcome"
                    },
                    data: {
                      Name: "Delivered slaves for original owners",
                      Value: 1,
                      id: 1
                    },
                    state: "lazy"
                  }
                }
              ]
            },
            {
              kind: "owned",
              property: "Voyage_Itinerary",
              ownedEntity: {
                entityRef: {
                  id: "e3aec793-808f-45a9-bc75-cb2985306783",
                  schema: "VoyageItinerary",
                  type: "new"
                },
                data: {},
                state: "new"
              },
              changes: [
                {
                  kind: "linked",
                  property: "VoyageItinerary_port_of_departure_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1822,
                      schema: "Location"
                    },
                    data: {
                      Name: "Cape of Good Hope",
                      Code: 60803,
                      id: 1822
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageItinerary_first_place_slave_purchase_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1869,
                      schema: "Location"
                    },
                    data: {
                      Name: "Saint Augustine's Bay; St. Augustin Bay",
                      Code: 60858,
                      id: 1869
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageItinerary_first_landing_place_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1822,
                      schema: "Location"
                    },
                    data: {
                      Name: "Cape of Good Hope",
                      Code: 60803,
                      id: 1822
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageItinerary_imp_port_voyage_begin_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1822,
                      schema: "Location"
                    },
                    data: {
                      Name: "Cape of Good Hope",
                      Code: 60803,
                      id: 1822
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property:
                    "VoyageItinerary_imp_principal_place_of_slave_purchase_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1869,
                      schema: "Location"
                    },
                    data: {
                      Name: "Saint Augustine's Bay; St. Augustin Bay",
                      Code: 60858,
                      id: 1869
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageItinerary_imp_principal_port_slave_dis_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1822,
                      schema: "Location"
                    },
                    data: {
                      Name: "Cape of Good Hope",
                      Code: 60803,
                      id: 1822
                    },
                    state: "lazy"
                  }
                }
              ]
            },
            {
              kind: "owned",
              property: "Voyage_Dates",
              ownedEntity: {
                entityRef: {
                  id: "c85be6c5-90a4-4718-944a-3c7291ebdf5b",
                  schema: "VoyageDates",
                  type: "new"
                },
                data: {},
                state: "new"
              },
              changes: [
                {
                  kind: "direct",
                  property:
                    "VoyageDates_imp_length_leaving_africa_to_disembark",
                  changed: "189"
                },
                {
                  kind: "linked",
                  property: "VoyageDates_imp_voyage_began_sparsedate_id",
                  changed: {
                    entityRef: {
                      id: "21ff1582-a589-42a8-9ab2-bd9a63be4dd7",
                      schema: "VoyageSparseDate",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  linkedChanges: [
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_year",
                      changed: "1663"
                    }
                  ]
                },
                {
                  kind: "linked",
                  property:
                    "VoyageDates_imp_arrival_at_port_of_dis_sparsedate_id",
                  changed: {
                    entityRef: {
                      id: "d8ede687-7f53-4571-b77f-fa2e76657178",
                      schema: "VoyageSparseDate",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  linkedChanges: [
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_year",
                      changed: "1663"
                    }
                  ]
                },
                {
                  kind: "linked",
                  property: "VoyageDates_voyage_began_sparsedate_id",
                  changed: {
                    entityRef: {
                      id: "258e5913-b2bf-45a4-b357-eeebb7e94642",
                      schema: "VoyageSparseDate",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  linkedChanges: [
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_year",
                      changed: "1663"
                    },
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_month",
                      changed: "05"
                    },
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_day",
                      changed: "29"
                    }
                  ]
                },
                {
                  kind: "linked",
                  property: "VoyageDates_first_dis_of_slaves_sparsedate_id",
                  changed: {
                    entityRef: {
                      id: "df261bac-18c9-4b9c-a869-85aa4b929112",
                      schema: "VoyageSparseDate",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  linkedChanges: [
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_year",
                      changed: "1663"
                    },
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_month",
                      changed: "12"
                    },
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_day",
                      changed: "04"
                    }
                  ]
                }
              ]
            },
            {
              kind: "owned",
              property: "Voyage_Slave numbers",
              ownedEntity: {
                entityRef: {
                  id: "f183c47f-aa37-46c6-908a-fe4255f67d66",
                  schema: "VoyageSlaveNumbers",
                  type: "new"
                },
                data: {},
                state: "new"
              },
              changes: [
                {
                  kind: "direct",
                  property: "VoyageSlaveNumbers_num_slaves_carried_first_port",
                  changed: "7"
                },
                {
                  kind: "direct",
                  property: "VoyageSlaveNumbers_num_slaves_carried_second_port",
                  changed: "0"
                },
                {
                  kind: "direct",
                  property: "VoyageSlaveNumbers_num_slaves_carried_third_port",
                  changed: "0"
                },
                {
                  kind: "direct",
                  property: "VoyageSlaveNumbers_total_num_slaves_purchased",
                  changed: "7"
                },
                {
                  kind: "direct",
                  property:
                    "VoyageSlaveNumbers_total_num_slaves_arr_first_port_embark",
                  changed: "7"
                },
                {
                  kind: "direct",
                  property: "VoyageSlaveNumbers_imp_total_num_slaves_embarked",
                  changed: "7"
                },
                {
                  kind: "direct",
                  property:
                    "VoyageSlaveNumbers_imp_total_num_slaves_disembarked",
                  changed: "7"
                },
                {
                  kind: "table",
                  property: "sn_characteristics",
                  changes: {
                    num_men_embark_first_port_purchase: "2",
                    num_women_embark_first_port_purchase: "2",
                    num_boy_embark_first_port_purchase: "2",
                    num_girl_embark_first_port_purchase: "1",
                    num_adult_embark_first_port_purchase: "0",
                    num_child_embark_first_port_purchase: "0",
                    num_infant_embark_first_port_purchase: "0"
                  }
                },
                {
                  kind: "direct",
                  property:
                    "VoyageSlaveNumbers_total_slaves_embarked_age_identified",
                  changed: "7"
                },
                {
                  kind: "direct",
                  property:
                    "VoyageSlaveNumbers_total_slaves_embarked_gender_identified",
                  changed: "7"
                },
                {
                  kind: "direct",
                  property:
                    "VoyageSlaveNumbers_total_slaves_dept_or_arr_age_identified",
                  changed: "7"
                },
                {
                  kind: "direct",
                  property:
                    "VoyageSlaveNumbers_total_slaves_dept_or_arr_gender_identified",
                  changed: "7"
                },
                {
                  kind: "direct",
                  property:
                    "VoyageSlaveNumbers_total_slaves_embarked_age_gender_identified",
                  changed: "7"
                },
                {
                  kind: "direct",
                  property:
                    "VoyageSlaveNumbers_total_slaves_by_age_gender_identified_departure_or_arrival",
                  changed: "7"
                },
                {
                  kind: "direct",
                  property:
                    "VoyageSlaveNumbers_percentage_boys_among_embarked_slaves",
                  changed: "0.285714286"
                },
                {
                  kind: "direct",
                  property:
                    "VoyageSlaveNumbers_child_ratio_among_embarked_slaves",
                  changed: "0.428571429"
                },
                {
                  kind: "direct",
                  property:
                    "VoyageSlaveNumbers_percentage_girls_among_embarked_slaves",
                  changed: "0.142857143"
                },
                {
                  kind: "direct",
                  property:
                    "VoyageSlaveNumbers_male_ratio_among_embarked_slaves",
                  changed: "0.571428571"
                },
                {
                  kind: "direct",
                  property:
                    "VoyageSlaveNumbers_percentage_men_among_embarked_slaves",
                  changed: "0.285714286"
                },
                {
                  kind: "direct",
                  property:
                    "VoyageSlaveNumbers_percentage_women_among_embarked_slaves",
                  changed: "0.285714286"
                },
                {
                  kind: "direct",
                  property: "VoyageSlaveNumbers_percentage_men",
                  changed: "0.285714286"
                },
                {
                  kind: "direct",
                  property: "VoyageSlaveNumbers_percentage_women",
                  changed: "0.285714286"
                },
                {
                  kind: "direct",
                  property: "VoyageSlaveNumbers_percentage_boy",
                  changed: "0.285714286"
                },
                {
                  kind: "direct",
                  property: "VoyageSlaveNumbers_percentage_girl",
                  changed: "0.142857143"
                },
                {
                  kind: "direct",
                  property: "VoyageSlaveNumbers_percentage_male",
                  changed: "0.571428571"
                },
                {
                  kind: "direct",
                  property: "VoyageSlaveNumbers_percentage_child",
                  changed: "0.428571429"
                },
                {
                  kind: "table",
                  property: "sn_characteristics_imputed",
                  changes: {
                    imp_num_adult_embarked: "4",
                    imp_num_children_embarked: "3",
                    imp_num_male_embarked: "4",
                    imp_num_female_embarked: "3",
                    imp_num_men_total: "2",
                    imp_num_women_total: "2",
                    imp_num_boy_total: "2",
                    imp_num_girl_total: "1",
                    imp_num_adult_total: "4",
                    imp_num_child_total: "3",
                    imp_num_males_total: "4",
                    imp_num_females_total: "3"
                  }
                }
              ]
            },
            {
              kind: "ownedList",
              property: "Voyage_Sources",
              removed: [],
              modified: [
                {
                  kind: "owned",
                  ownedEntity: {
                    entityRef: {
                      id: "f38d5478-eff1-4abd-baf1-be3d4f60e98d",
                      schema: "Voyage Source Connection",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  changes: [
                    {
                      kind: "linked",
                      property: "Voyage Source Connection_source_id",
                      changed: {
                        entityRef: {
                          type: "existing",
                          id: 14389,
                          schema: "Voyage Source"
                        },
                        data: {
                          Title: "VOC 3993",
                          Bibliography: "VOC 3993",
                          Notes: "Armstrong database",
                          id: 14389,
                          "Short reference id": 1628
                        },
                        state: "lazy"
                      }
                    },
                    {
                      kind: "direct",
                      property: "Voyage Source Connection_page_range",
                      changed: "Nos. 19, 20, 21"
                    }
                  ]
                },
                {
                  kind: "owned",
                  ownedEntity: {
                    entityRef: {
                      id: "64e3c813-6e30-4830-9942-802fdb9d890a",
                      schema: "Voyage Source Connection",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  changes: [
                    {
                      kind: "linked",
                      property: "Voyage Source Connection_source_id",
                      changed: {
                        entityRef: {
                          type: "existing",
                          id: 19486,
                          schema: "Voyage Source"
                        },
                        data: {
                          Title: "Resolusies van die Politieke Raad",
                          Bibliography: null,
                          Notes: null,
                          id: 19486,
                          "Short reference id": 2717
                        },
                        state: "lazy"
                      }
                    },
                    {
                      kind: "direct",
                      property: "Voyage Source Connection_page_range",
                      changed: "301-302"
                    }
                  ]
                },
                {
                  kind: "owned",
                  ownedEntity: {
                    entityRef: {
                      id: "0ca7bf85-7e72-4a90-94c3-cf27899b3f50",
                      schema: "Voyage Source Connection",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  changes: [
                    {
                      kind: "linked",
                      property: "Voyage Source Connection_source_id",
                      changed: {
                        entityRef: {
                          type: "existing",
                          id: 14397,
                          schema: "Voyage Source"
                        },
                        data: {
                          Title:
                            "Dagregister En Briewe Van Zacharias Wagenaer 1662-1666",
                          Bibliography:
                            "Dagregister En Briewe Van Zacharias Wagenaer 1662-1666",
                          Notes: "",
                          id: 14397,
                          "Short reference id": 1634
                        },
                        state: "lazy"
                      }
                    },
                    {
                      kind: "direct",
                      property: "Voyage Source Connection_page_range",
                      changed: "110"
                    }
                  ]
                }
              ]
            },
            {
              kind: "ownedList",
              property: "Voyage_Enslavement relations",
              removed: [],
              modified: [
                {
                  kind: "owned",
                  ownedEntity: {
                    entityRef: {
                      id: "102a7708-cc8a-4628-8c1a-1d154c3b15cb",
                      schema: "EnslavementRelation",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  changes: [
                    {
                      kind: "linked",
                      property: "EnslavementRelation_relation_type_id",
                      changed: {
                        entityRef: {
                          type: "existing",
                          id: 1,
                          schema: "EnslavementRelationType"
                        },
                        data: {
                          "Relation type": "Transaction",
                          id: 1
                        },
                        state: "lazy"
                      }
                    },
                    {
                      kind: "ownedList",
                      property: "EnslavementRelation_Enslavers in relation",
                      removed: [],
                      modified: [
                        {
                          kind: "owned",
                          ownedEntity: {
                            entityRef: {
                              id: "6ac39de8-8bc7-40eb-afe8-86eee7e97375",
                              schema: "EnslaverInRelation",
                              type: "new"
                            },
                            data: {},
                            state: "new"
                          },
                          changes: [
                            {
                              kind: "linked",
                              property: "EnslaverInRelation_enslaver_alias_id",
                              changed: {
                                entityRef: {
                                  id: "CanonicalEnslaverAliasId_VOC",
                                  schema: "EnslaverAliasWithIdentity",
                                  type: "new"
                                },
                                data: {},
                                state: "new"
                              },
                              linkedChanges: [
                                {
                                  kind: "direct",
                                  property:
                                    "EnslaverAlias_alias_EnslaverAliasWithIdentity",
                                  changed: "VOC"
                                },
                                {
                                  kind: "linked",
                                  property:
                                    "EnslaverAliasWithIdentity_identity_id",
                                  changed: {
                                    entityRef: {
                                      id: "CanonicalEnslaverIdentityId_VOC",
                                      schema: "Enslaver",
                                      type: "new"
                                    },
                                    data: {},
                                    state: "new"
                                  },
                                  linkedChanges: [
                                    {
                                      kind: "direct",
                                      property: "Enslaver_principal_alias",
                                      changed: "VOC"
                                    }
                                  ]
                                }
                              ]
                            },
                            {
                              kind: "ownedList",
                              property: "EnslaverInRelation_Roles",
                              removed: [],
                              modified: [
                                {
                                  kind: "owned",
                                  ownedEntity: {
                                    entityRef: {
                                      id: "c17bb09d-7e14-4f41-9a84-aac13c9d756b",
                                      schema: "EnslaverRelationRoleConn",
                                      type: "new"
                                    },
                                    data: {},
                                    state: "new"
                                  },
                                  changes: [
                                    {
                                      kind: "linked",
                                      property:
                                        "EnslaverRelationRoleConn_enslaverrole_id",
                                      changed: {
                                        entityRef: {
                                          type: "existing",
                                          id: 4,
                                          schema: "EnslaverRole"
                                        },
                                        data: {
                                          "Enslaver role": "Seller",
                                          id: 4
                                        },
                                        state: "lazy"
                                      }
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        },
                        {
                          kind: "owned",
                          ownedEntity: {
                            entityRef: {
                              id: "81dc08cf-3636-46f3-9588-e0be75d18d27",
                              schema: "EnslaverInRelation",
                              type: "new"
                            },
                            data: {},
                            state: "new"
                          },
                          changes: [
                            {
                              kind: "linked",
                              property: "EnslaverInRelation_enslaver_alias_id",
                              changed: {
                                entityRef: {
                                  id: "CanonicalEnslaverAliasId_Blanck",
                                  schema: "EnslaverAliasWithIdentity",
                                  type: "new"
                                },
                                data: {},
                                state: "new"
                              },
                              linkedChanges: [
                                {
                                  kind: "direct",
                                  property:
                                    "EnslaverAlias_alias_EnslaverAliasWithIdentity",
                                  changed: "Blanck"
                                },
                                {
                                  kind: "linked",
                                  property:
                                    "EnslaverAliasWithIdentity_identity_id",
                                  changed: {
                                    entityRef: {
                                      type: "existing",
                                      id: 1021776,
                                      schema: "Enslaver"
                                    },
                                    data: {
                                      "Principal alias": "Blanck",
                                      "Birth year": null,
                                      "Birth month": null,
                                      "Birth day": null,
                                      "Death year": null,
                                      "Death month": null,
                                      "Death day": null,
                                      "Father name": null,
                                      "Father occupation": null,
                                      "Mother name": null,
                                      "Probate date": null,
                                      "Will value (pounds)": null,
                                      "Will value (dollars)": null,
                                      "Will court": null,
                                      Notes: "",
                                      id: 1021776
                                    },
                                    state: "lazy"
                                  }
                                }
                              ]
                            },
                            {
                              kind: "ownedList",
                              property: "EnslaverInRelation_Roles",
                              removed: [],
                              modified: [
                                {
                                  kind: "owned",
                                  ownedEntity: {
                                    entityRef: {
                                      id: "e03fbdc8-e774-41e0-bca5-f80205582b72",
                                      schema: "EnslaverRelationRoleConn",
                                      type: "new"
                                    },
                                    data: {},
                                    state: "new"
                                  },
                                  changes: [
                                    {
                                      kind: "linked",
                                      property:
                                        "EnslaverRelationRoleConn_enslaverrole_id",
                                      changed: {
                                        entityRef: {
                                          type: "existing",
                                          id: 1,
                                          schema: "EnslaverRole"
                                        },
                                        data: {
                                          "Enslaver role": "Captain",
                                          id: 1
                                        },
                                        state: "lazy"
                                      }
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    status: 0,
    reviews: [],
    media: [],
    batch: {
      id: 1,
      title: "Import of Voyage from IOA_Voyages updated sources.csv",
      comments:
        "Batch created for import of Voyage from CSV file IOA_Voyages updated sources.csv",
      published: null
    }
  },
  {
    id: "Voyage.Voyage.500009",
    root: {
      id: "500009",
      schema: "Voyage",
      type: "new"
    },
    changeSet: {
      id: "e2d0a359-4cbd-4542-b807-3ae29f9a2809",
      author: "CSV importer script",
      title: "Import of Voyage #500009",
      comments:
        "Imported from CSV file IOA_Voyages updated sources.csv on 2025-07-18T16:29:10.229Z",
      timestamp: 1752856150223,
      changes: [
        {
          type: "update",
          entityRef: {
            id: "500009",
            schema: "Voyage",
            type: "new"
          },
          changes: [
            {
              kind: "direct",
              property: "Voyage_voyage_id",
              changed: "500009"
            },
            {
              kind: "direct",
              property: "Voyage_dataset",
              changed: "3"
            },
            {
              kind: "linked",
              property: "Voyage_voyage_groupings",
              changed: null
            },
            {
              kind: "owned",
              property: "Voyage_Ship",
              ownedEntity: {
                entityRef: {
                  id: "ba17b46f-7b7e-4b9f-9c79-48871bcb59c2",
                  schema: "VoyageShip",
                  type: "new"
                },
                data: {},
                state: "new"
              },
              changes: [
                {
                  kind: "direct",
                  property: "VoyageShip_ship_name",
                  changed: "Waterhoen"
                },
                {
                  kind: "linked",
                  property: "VoyageShip_nationality_ship_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 8,
                      schema: "Nationality"
                    },
                    data: {
                      "Nation name": "Netherlands",
                      Code: 8,
                      id: 8
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageShip_rig_of_vessel_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 32,
                      schema: "RigOfVessel"
                    },
                    data: {
                      "Rig of vessel": "Fluit",
                      Code: 32,
                      id: 32
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "direct",
                  property: "VoyageShip_tonnage",
                  changed: "193"
                },
                {
                  kind: "linked",
                  property: "VoyageShip_imputed_nationality_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 8,
                      schema: "Nationality"
                    },
                    data: {
                      "Nation name": "Netherlands",
                      Code: 8,
                      id: 8
                    },
                    state: "lazy"
                  }
                }
              ]
            },
            {
              kind: "owned",
              property: "Voyage_Crew",
              ownedEntity: {
                entityRef: {
                  id: "be59532e-e8c1-4e4c-ab23-c17da7f21951",
                  schema: "VoyageCrew",
                  type: "new"
                },
                data: {},
                state: "new"
              },
              changes: [
                {
                  kind: "direct",
                  property: "VoyageCrew_crew_voyage_outset",
                  changed: "46"
                }
              ]
            },
            {
              kind: "owned",
              property: "Voyage_Outcome",
              ownedEntity: {
                entityRef: {
                  id: "7a5690c2-bf62-4b9f-b22d-ebc797efd0a1",
                  schema: "VoyageOutcome",
                  type: "new"
                },
                data: {},
                state: "new"
              },
              changes: [
                {
                  kind: "linked",
                  property: "VoyageOutcome_particular_outcome_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 80,
                      schema: "ParticularOutcome"
                    },
                    data: {
                      Name: "Returned to Europe or Americas without obtaining slaves",
                      Value: 93,
                      id: 80
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageOutcome_outcome_slaves_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 2,
                      schema: "SlavesOutcome"
                    },
                    data: {
                      Name: "No slaves embarked",
                      Value: 2,
                      id: 2
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageOutcome_vessel_captured_outcome_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 13,
                      schema: "VesselOutcomeSchema"
                    },
                    data: {
                      Name: "Not captured",
                      Value: 14,
                      id: 13
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageOutcome_outcome_owner_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 3,
                      schema: "OwnerOutcome"
                    },
                    data: {
                      Name: "Original goal thwarted (human agency)",
                      Value: 3,
                      id: 3
                    },
                    state: "lazy"
                  }
                }
              ]
            },
            {
              kind: "owned",
              property: "Voyage_Itinerary",
              ownedEntity: {
                entityRef: {
                  id: "74ca1ed7-c6ac-4098-aab3-74b02c971889",
                  schema: "VoyageItinerary",
                  type: "new"
                },
                data: {},
                state: "new"
              },
              changes: [
                {
                  kind: "linked",
                  property: "VoyageItinerary_port_of_departure_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1822,
                      schema: "Location"
                    },
                    data: {
                      Name: "Cape of Good Hope",
                      Code: 60803,
                      id: 1822
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageItinerary_first_place_slave_purchase_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1851,
                      schema: "Location"
                    },
                    data: {
                      Name: "Antongil Bay",
                      Code: 60840,
                      id: 1851
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageItinerary_first_landing_place_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1822,
                      schema: "Location"
                    },
                    data: {
                      Name: "Cape of Good Hope",
                      Code: 60803,
                      id: 1822
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageItinerary_imp_port_voyage_begin_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1822,
                      schema: "Location"
                    },
                    data: {
                      Name: "Cape of Good Hope",
                      Code: 60803,
                      id: 1822
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property:
                    "VoyageItinerary_imp_principal_place_of_slave_purchase_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1851,
                      schema: "Location"
                    },
                    data: {
                      Name: "Antongil Bay",
                      Code: 60840,
                      id: 1851
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageItinerary_imp_principal_port_slave_dis_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1822,
                      schema: "Location"
                    },
                    data: {
                      Name: "Cape of Good Hope",
                      Code: 60803,
                      id: 1822
                    },
                    state: "lazy"
                  }
                }
              ]
            },
            {
              kind: "owned",
              property: "Voyage_Dates",
              ownedEntity: {
                entityRef: {
                  id: "806f1b45-6746-4af1-b618-be1aeff18812",
                  schema: "VoyageDates",
                  type: "new"
                },
                data: {},
                state: "new"
              },
              changes: [
                {
                  kind: "direct",
                  property:
                    "VoyageDates_imp_length_leaving_africa_to_disembark",
                  changed: "50"
                },
                {
                  kind: "linked",
                  property: "VoyageDates_imp_voyage_began_sparsedate_id",
                  changed: {
                    entityRef: {
                      id: "d6054b90-3d74-4bcb-bb02-c4af8b5d5199",
                      schema: "VoyageSparseDate",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  linkedChanges: [
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_year",
                      changed: "1664"
                    }
                  ]
                },
                {
                  kind: "linked",
                  property:
                    "VoyageDates_imp_arrival_at_port_of_dis_sparsedate_id",
                  changed: {
                    entityRef: {
                      id: "440a9a7d-2f6c-42d4-aa18-0f09211c54fb",
                      schema: "VoyageSparseDate",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  linkedChanges: [
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_year",
                      changed: "1664"
                    }
                  ]
                },
                {
                  kind: "linked",
                  property: "VoyageDates_voyage_began_sparsedate_id",
                  changed: {
                    entityRef: {
                      id: "5dec7862-1286-4835-b5e9-b28532d4b5c1",
                      schema: "VoyageSparseDate",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  linkedChanges: [
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_year",
                      changed: "1664"
                    },
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_month",
                      changed: "05"
                    },
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_day",
                      changed: "20"
                    }
                  ]
                },
                {
                  kind: "linked",
                  property: "VoyageDates_first_dis_of_slaves_sparsedate_id",
                  changed: {
                    entityRef: {
                      id: "1fbd8619-124c-49a1-9e6a-88e26ec87ea6",
                      schema: "VoyageSparseDate",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  linkedChanges: [
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_year",
                      changed: "1664"
                    },
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_month",
                      changed: "11"
                    },
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_day",
                      changed: "15"
                    }
                  ]
                }
              ]
            },
            {
              kind: "owned",
              property: "Voyage_Slave numbers",
              ownedEntity: {
                entityRef: {
                  id: "10323fed-1f5e-4c2c-83ca-3e7a6511b03a",
                  schema: "VoyageSlaveNumbers",
                  type: "new"
                },
                data: {},
                state: "new"
              },
              changes: [
                {
                  kind: "direct",
                  property: "VoyageSlaveNumbers_num_slaves_carried_first_port",
                  changed: "1"
                },
                {
                  kind: "direct",
                  property: "VoyageSlaveNumbers_num_slaves_carried_second_port",
                  changed: "0"
                },
                {
                  kind: "direct",
                  property: "VoyageSlaveNumbers_num_slaves_carried_third_port",
                  changed: "0"
                },
                {
                  kind: "direct",
                  property: "VoyageSlaveNumbers_total_num_slaves_purchased",
                  changed: "1"
                },
                {
                  kind: "table",
                  property: "sn_characteristics",
                  changes: {
                    num_men_embark_first_port_purchase: "1",
                    num_women_embark_first_port_purchase: "0",
                    num_boy_embark_first_port_purchase: "0",
                    num_girl_embark_first_port_purchase: "0",
                    num_adult_embark_first_port_purchase: "0",
                    num_child_embark_first_port_purchase: "0",
                    num_infant_embark_first_port_purchase: "0"
                  }
                }
              ]
            },
            {
              kind: "ownedList",
              property: "Voyage_Sources",
              removed: [],
              modified: [
                {
                  kind: "owned",
                  ownedEntity: {
                    entityRef: {
                      id: "b3d0a1c3-e70d-4627-92d1-1038a0ad9380",
                      schema: "Voyage Source Connection",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  changes: [
                    {
                      kind: "linked",
                      property: "Voyage Source Connection_source_id",
                      changed: {
                        entityRef: {
                          type: "existing",
                          id: 14398,
                          schema: "Voyage Source"
                        },
                        data: {
                          Title: "VOC 3999",
                          Bibliography: "VOC 3999",
                          Notes: "",
                          id: 14398,
                          "Short reference id": 1635
                        },
                        state: "lazy"
                      }
                    },
                    {
                      kind: "direct",
                      property: "Voyage Source Connection_page_range",
                      changed: "92-122"
                    }
                  ]
                },
                {
                  kind: "owned",
                  ownedEntity: {
                    entityRef: {
                      id: "1684dfd5-68ff-4701-89d4-abac14d24852",
                      schema: "Voyage Source Connection",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  changes: [
                    {
                      kind: "linked",
                      property: "Voyage Source Connection_source_id",
                      changed: {
                        entityRef: {
                          type: "existing",
                          id: 19486,
                          schema: "Voyage Source"
                        },
                        data: {
                          Title: "Resolusies van die Politieke Raad",
                          Bibliography: null,
                          Notes: null,
                          id: 19486,
                          "Short reference id": 2717
                        },
                        state: "lazy"
                      }
                    },
                    {
                      kind: "direct",
                      property: "Voyage Source Connection_page_range",
                      changed: "vol 1, 316-7"
                    }
                  ]
                },
                {
                  kind: "owned",
                  ownedEntity: {
                    entityRef: {
                      id: "a4268a4b-4bac-4752-83d8-9c384e88a181",
                      schema: "Voyage Source Connection",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  changes: [
                    {
                      kind: "linked",
                      property: "Voyage Source Connection_source_id",
                      changed: {
                        entityRef: {
                          type: "existing",
                          id: 14397,
                          schema: "Voyage Source"
                        },
                        data: {
                          Title:
                            "Dagregister En Briewe Van Zacharias Wagenaer 1662-1666",
                          Bibliography:
                            "Dagregister En Briewe Van Zacharias Wagenaer 1662-1666",
                          Notes: "",
                          id: 14397,
                          "Short reference id": 1634
                        },
                        state: "lazy"
                      }
                    },
                    {
                      kind: "direct",
                      property: "Voyage Source Connection_page_range",
                      changed: "173"
                    }
                  ]
                }
              ]
            },
            {
              kind: "ownedList",
              property: "Voyage_Enslavement relations",
              removed: [],
              modified: [
                {
                  kind: "owned",
                  ownedEntity: {
                    entityRef: {
                      id: "df4837e2-81b0-45cb-bdb7-97ce583a91b9",
                      schema: "EnslavementRelation",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  changes: [
                    {
                      kind: "linked",
                      property: "EnslavementRelation_relation_type_id",
                      changed: {
                        entityRef: {
                          type: "existing",
                          id: 1,
                          schema: "EnslavementRelationType"
                        },
                        data: {
                          "Relation type": "Transaction",
                          id: 1
                        },
                        state: "lazy"
                      }
                    },
                    {
                      kind: "ownedList",
                      property: "EnslavementRelation_Enslavers in relation",
                      removed: [],
                      modified: [
                        {
                          kind: "owned",
                          ownedEntity: {
                            entityRef: {
                              id: "e887c19f-2d0d-4886-be5c-c59c16569906",
                              schema: "EnslaverInRelation",
                              type: "new"
                            },
                            data: {},
                            state: "new"
                          },
                          changes: [
                            {
                              kind: "linked",
                              property: "EnslaverInRelation_enslaver_alias_id",
                              changed: {
                                entityRef: {
                                  id: "CanonicalEnslaverAliasId_VOC",
                                  schema: "EnslaverAliasWithIdentity",
                                  type: "new"
                                },
                                data: {},
                                state: "new"
                              },
                              linkedChanges: [
                                {
                                  kind: "direct",
                                  property:
                                    "EnslaverAlias_alias_EnslaverAliasWithIdentity",
                                  changed: "VOC"
                                },
                                {
                                  kind: "linked",
                                  property:
                                    "EnslaverAliasWithIdentity_identity_id",
                                  changed: {
                                    entityRef: {
                                      id: "CanonicalEnslaverIdentityId_VOC",
                                      schema: "Enslaver",
                                      type: "new"
                                    },
                                    data: {},
                                    state: "new"
                                  },
                                  linkedChanges: [
                                    {
                                      kind: "direct",
                                      property: "Enslaver_principal_alias",
                                      changed: "VOC"
                                    }
                                  ]
                                }
                              ]
                            },
                            {
                              kind: "ownedList",
                              property: "EnslaverInRelation_Roles",
                              removed: [],
                              modified: [
                                {
                                  kind: "owned",
                                  ownedEntity: {
                                    entityRef: {
                                      id: "50049e01-5242-455b-9d51-b576c7355c44",
                                      schema: "EnslaverRelationRoleConn",
                                      type: "new"
                                    },
                                    data: {},
                                    state: "new"
                                  },
                                  changes: [
                                    {
                                      kind: "linked",
                                      property:
                                        "EnslaverRelationRoleConn_enslaverrole_id",
                                      changed: {
                                        entityRef: {
                                          type: "existing",
                                          id: 4,
                                          schema: "EnslaverRole"
                                        },
                                        data: {
                                          "Enslaver role": "Seller",
                                          id: 4
                                        },
                                        state: "lazy"
                                      }
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    status: 0,
    reviews: [],
    media: [],
    batch: {
      id: 1,
      title: "Import of Voyage from IOA_Voyages updated sources.csv",
      comments:
        "Batch created for import of Voyage from CSV file IOA_Voyages updated sources.csv",
      published: null
    }
  },
  {
    id: "Voyage.Voyage.500010",
    root: {
      id: "500010",
      schema: "Voyage",
      type: "new"
    },
    changeSet: {
      id: "9857271d-126d-418f-a6fd-2f33c9248697",
      author: "CSV importer script",
      title: "Import of Voyage #500010",
      comments:
        "Imported from CSV file IOA_Voyages updated sources.csv on 2025-07-18T16:29:10.246Z",
      timestamp: 1752856150241,
      changes: [
        {
          type: "update",
          entityRef: {
            id: "500010",
            schema: "Voyage",
            type: "new"
          },
          changes: [
            {
              kind: "direct",
              property: "Voyage_voyage_id",
              changed: "500010"
            },
            {
              kind: "direct",
              property: "Voyage_dataset",
              changed: "3"
            },
            {
              kind: "linked",
              property: "Voyage_voyage_groupings",
              changed: null
            },
            {
              kind: "owned",
              property: "Voyage_Ship",
              ownedEntity: {
                entityRef: {
                  id: "42ccb94d-01ab-4e2d-9bef-cb12da7f1a79",
                  schema: "VoyageShip",
                  type: "new"
                },
                data: {},
                state: "new"
              },
              changes: [
                {
                  kind: "direct",
                  property: "VoyageShip_ship_name",
                  changed: "Hoogh Caspel"
                },
                {
                  kind: "linked",
                  property: "VoyageShip_nationality_ship_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 8,
                      schema: "Nationality"
                    },
                    data: {
                      "Nation name": "Netherlands",
                      Code: 8,
                      id: 8
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "direct",
                  property: "VoyageShip_tonnage",
                  changed: "212"
                },
                {
                  kind: "linked",
                  property: "VoyageShip_imputed_nationality_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 8,
                      schema: "Nationality"
                    },
                    data: {
                      "Nation name": "Netherlands",
                      Code: 8,
                      id: 8
                    },
                    state: "lazy"
                  }
                }
              ]
            },
            {
              kind: "owned",
              property: "Voyage_Outcome",
              ownedEntity: {
                entityRef: {
                  id: "644ad17f-0b85-41bf-b206-4b18bd42cb48",
                  schema: "VoyageOutcome",
                  type: "new"
                },
                data: {},
                state: "new"
              },
              changes: [
                {
                  kind: "linked",
                  property: "VoyageOutcome_particular_outcome_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 80,
                      schema: "ParticularOutcome"
                    },
                    data: {
                      Name: "Returned to Europe or Americas without obtaining slaves",
                      Value: 93,
                      id: 80
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageOutcome_outcome_slaves_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 2,
                      schema: "SlavesOutcome"
                    },
                    data: {
                      Name: "No slaves embarked",
                      Value: 2,
                      id: 2
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageOutcome_vessel_captured_outcome_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 13,
                      schema: "VesselOutcomeSchema"
                    },
                    data: {
                      Name: "Not captured",
                      Value: 14,
                      id: 13
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageOutcome_outcome_owner_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 3,
                      schema: "OwnerOutcome"
                    },
                    data: {
                      Name: "Original goal thwarted (human agency)",
                      Value: 3,
                      id: 3
                    },
                    state: "lazy"
                  }
                }
              ]
            },
            {
              kind: "owned",
              property: "Voyage_Itinerary",
              ownedEntity: {
                entityRef: {
                  id: "cc09fecd-d6b9-43cb-8819-2ee0242ad663",
                  schema: "VoyageItinerary",
                  type: "new"
                },
                data: {},
                state: "new"
              },
              changes: [
                {
                  kind: "linked",
                  property: "VoyageItinerary_port_of_departure_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1822,
                      schema: "Location"
                    },
                    data: {
                      Name: "Cape of Good Hope",
                      Code: 60803,
                      id: 1822
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageItinerary_first_place_slave_purchase_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1869,
                      schema: "Location"
                    },
                    data: {
                      Name: "Saint Augustine's Bay; St. Augustin Bay",
                      Code: 60858,
                      id: 1869
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property: "VoyageItinerary_imp_port_voyage_begin_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1822,
                      schema: "Location"
                    },
                    data: {
                      Name: "Cape of Good Hope",
                      Code: 60803,
                      id: 1822
                    },
                    state: "lazy"
                  }
                },
                {
                  kind: "linked",
                  property:
                    "VoyageItinerary_imp_principal_place_of_slave_purchase_id",
                  changed: {
                    entityRef: {
                      type: "existing",
                      id: 1869,
                      schema: "Location"
                    },
                    data: {
                      Name: "Saint Augustine's Bay; St. Augustin Bay",
                      Code: 60858,
                      id: 1869
                    },
                    state: "lazy"
                  }
                }
              ]
            },
            {
              kind: "owned",
              property: "Voyage_Dates",
              ownedEntity: {
                entityRef: {
                  id: "0503b0cd-da92-4d26-a447-cae4fffdd0bf",
                  schema: "VoyageDates",
                  type: "new"
                },
                data: {},
                state: "new"
              },
              changes: [
                {
                  kind: "direct",
                  property:
                    "VoyageDates_imp_length_leaving_africa_to_disembark",
                  changed: "55"
                },
                {
                  kind: "linked",
                  property: "VoyageDates_imp_voyage_began_sparsedate_id",
                  changed: {
                    entityRef: {
                      id: "7730b91d-a479-4333-b0ac-3457913ca709",
                      schema: "VoyageSparseDate",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  linkedChanges: [
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_year",
                      changed: "1666"
                    }
                  ]
                },
                {
                  kind: "linked",
                  property:
                    "VoyageDates_imp_arrival_at_port_of_dis_sparsedate_id",
                  changed: {
                    entityRef: {
                      id: "cdd597ed-4dfd-43c1-a264-f27deba0abf5",
                      schema: "VoyageSparseDate",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  linkedChanges: [
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_year",
                      changed: "1666"
                    }
                  ]
                },
                {
                  kind: "linked",
                  property: "VoyageDates_voyage_began_sparsedate_id",
                  changed: {
                    entityRef: {
                      id: "9f10caaf-11b5-4f34-9441-004a51123f4a",
                      schema: "VoyageSparseDate",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  linkedChanges: [
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_year",
                      changed: "1666"
                    },
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_month",
                      changed: "06"
                    },
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_day",
                      changed: "27"
                    }
                  ]
                },
                {
                  kind: "linked",
                  property: "VoyageDates_first_dis_of_slaves_sparsedate_id",
                  changed: {
                    entityRef: {
                      id: "e543c17a-0c72-4951-a659-4bb9d9f7e901",
                      schema: "VoyageSparseDate",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  linkedChanges: [
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_year",
                      changed: "1666"
                    },
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_month",
                      changed: "11"
                    },
                    {
                      kind: "direct",
                      property: "VoyageSparseDate_day",
                      changed: "11"
                    }
                  ]
                }
              ]
            },
            {
              kind: "ownedList",
              property: "Voyage_Sources",
              removed: [],
              modified: [
                {
                  kind: "owned",
                  ownedEntity: {
                    entityRef: {
                      id: "1230bf00-0927-4edd-9989-dc2dc52cc38f",
                      schema: "Voyage Source Connection",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  changes: [
                    {
                      kind: "linked",
                      property: "Voyage Source Connection_source_id",
                      changed: {
                        entityRef: {
                          type: "existing",
                          id: 14399,
                          schema: "Voyage Source"
                        },
                        data: {
                          Title: "VOC 4001",
                          Bibliography: "VOC 4001",
                          Notes: "",
                          id: 14399,
                          "Short reference id": 1636
                        },
                        state: "lazy"
                      }
                    },
                    {
                      kind: "direct",
                      property: "Voyage Source Connection_page_range",
                      changed: "ff. 352v-357v, 461-468"
                    }
                  ]
                },
                {
                  kind: "owned",
                  ownedEntity: {
                    entityRef: {
                      id: "f0a45893-c453-40e6-aa82-4407a78584cd",
                      schema: "Voyage Source Connection",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  changes: [
                    {
                      kind: "linked",
                      property: "Voyage Source Connection_source_id",
                      changed: {
                        entityRef: {
                          type: "existing",
                          id: 19486,
                          schema: "Voyage Source"
                        },
                        data: {
                          Title: "Resolusies van die Politieke Raad",
                          Bibliography: null,
                          Notes: null,
                          id: 19486,
                          "Short reference id": 2717
                        },
                        state: "lazy"
                      }
                    },
                    {
                      kind: "direct",
                      property: "Voyage Source Connection_page_range",
                      changed: "349"
                    }
                  ]
                },
                {
                  kind: "owned",
                  ownedEntity: {
                    entityRef: {
                      id: "617f8894-54c9-4922-b362-f76bcb393f6a",
                      schema: "Voyage Source Connection",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  changes: [
                    {
                      kind: "linked",
                      property: "Voyage Source Connection_source_id",
                      changed: {
                        entityRef: {
                          type: "existing",
                          id: 1667,
                          schema: "Voyage Source"
                        },
                        data: {
                          Title:
                            "Precis of the Archives of the Cape of Good Hope",
                          Bibliography:
                            "<div class=\"csl-bib-body\" style=\"line-height: 1.35; padding-left: 1em; text-indent:-1em;\">\r\n  <div class=\"csl-entry\">Leibbrandt, H. C. V., ed. <i>Precis of the Archives of the Cape of Good Hope</i>. 16 vols. Cape Town, ZA: W. A. Richards & sons, n.d.</div>\r\n</div>",
                          Notes:
                            "FULL REF: Leibbrandt, Hendrik Carel Vos (ed.), <i>Precis of the Archives of the Cape of Good Hope</i>, 16 vols. (Cape Town, 1896-1906).       \\DOC TYPE: Published source",
                          id: 1667,
                          "Short reference id": 863
                        },
                        state: "lazy"
                      }
                    },
                    {
                      kind: "direct",
                      property: "Voyage Source Connection_page_range",
                      changed: "Precis, 1649-1662, 197-201"
                    }
                  ]
                }
              ]
            },
            {
              kind: "ownedList",
              property: "Voyage_Enslavement relations",
              removed: [],
              modified: [
                {
                  kind: "owned",
                  ownedEntity: {
                    entityRef: {
                      id: "e2a54ffd-4c56-4d1a-a509-47b8e73698a6",
                      schema: "EnslavementRelation",
                      type: "new"
                    },
                    data: {},
                    state: "new"
                  },
                  changes: [
                    {
                      kind: "linked",
                      property: "EnslavementRelation_relation_type_id",
                      changed: {
                        entityRef: {
                          type: "existing",
                          id: 1,
                          schema: "EnslavementRelationType"
                        },
                        data: {
                          "Relation type": "Transaction",
                          id: 1
                        },
                        state: "lazy"
                      }
                    },
                    {
                      kind: "ownedList",
                      property: "EnslavementRelation_Enslavers in relation",
                      removed: [],
                      modified: [
                        {
                          kind: "owned",
                          ownedEntity: {
                            entityRef: {
                              id: "064d9308-91af-4aa7-a18f-7c79dd6097d0",
                              schema: "EnslaverInRelation",
                              type: "new"
                            },
                            data: {},
                            state: "new"
                          },
                          changes: [
                            {
                              kind: "linked",
                              property: "EnslaverInRelation_enslaver_alias_id",
                              changed: {
                                entityRef: {
                                  id: "CanonicalEnslaverAliasId_VOC",
                                  schema: "EnslaverAliasWithIdentity",
                                  type: "new"
                                },
                                data: {},
                                state: "new"
                              },
                              linkedChanges: [
                                {
                                  kind: "direct",
                                  property:
                                    "EnslaverAlias_alias_EnslaverAliasWithIdentity",
                                  changed: "VOC"
                                },
                                {
                                  kind: "linked",
                                  property:
                                    "EnslaverAliasWithIdentity_identity_id",
                                  changed: {
                                    entityRef: {
                                      id: "CanonicalEnslaverIdentityId_VOC",
                                      schema: "Enslaver",
                                      type: "new"
                                    },
                                    data: {},
                                    state: "new"
                                  },
                                  linkedChanges: [
                                    {
                                      kind: "direct",
                                      property: "Enslaver_principal_alias",
                                      changed: "VOC"
                                    }
                                  ]
                                }
                              ]
                            },
                            {
                              kind: "ownedList",
                              property: "EnslaverInRelation_Roles",
                              removed: [],
                              modified: [
                                {
                                  kind: "owned",
                                  ownedEntity: {
                                    entityRef: {
                                      id: "7892943e-9b5b-4163-83d7-11733987310c",
                                      schema: "EnslaverRelationRoleConn",
                                      type: "new"
                                    },
                                    data: {},
                                    state: "new"
                                  },
                                  changes: [
                                    {
                                      kind: "linked",
                                      property:
                                        "EnslaverRelationRoleConn_enslaverrole_id",
                                      changed: {
                                        entityRef: {
                                          type: "existing",
                                          id: 4,
                                          schema: "EnslaverRole"
                                        },
                                        data: {
                                          "Enslaver role": "Seller",
                                          id: 4
                                        },
                                        state: "lazy"
                                      }
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        },
                        {
                          kind: "owned",
                          ownedEntity: {
                            entityRef: {
                              id: "dac0ecf3-37dd-4ece-aefd-4784e7c3811b",
                              schema: "EnslaverInRelation",
                              type: "new"
                            },
                            data: {},
                            state: "new"
                          },
                          changes: [
                            {
                              kind: "linked",
                              property: "EnslaverInRelation_enslaver_alias_id",
                              changed: {
                                entityRef: {
                                  id: "CanonicalEnslaverAliasId_Granaet",
                                  schema: "EnslaverAliasWithIdentity",
                                  type: "new"
                                },
                                data: {},
                                state: "new"
                              },
                              linkedChanges: [
                                {
                                  kind: "direct",
                                  property:
                                    "EnslaverAlias_alias_EnslaverAliasWithIdentity",
                                  changed: "Granaet"
                                },
                                {
                                  kind: "linked",
                                  property:
                                    "EnslaverAliasWithIdentity_identity_id",
                                  changed: {
                                    entityRef: {
                                      id: "CanonicalEnslaverIdentityId_Granaet",
                                      schema: "Enslaver",
                                      type: "new"
                                    },
                                    data: {},
                                    state: "new"
                                  },
                                  linkedChanges: [
                                    {
                                      kind: "direct",
                                      property: "Enslaver_principal_alias",
                                      changed: "Granaet"
                                    }
                                  ]
                                }
                              ]
                            },
                            {
                              kind: "ownedList",
                              property: "EnslaverInRelation_Roles",
                              removed: [],
                              modified: [
                                {
                                  kind: "owned",
                                  ownedEntity: {
                                    entityRef: {
                                      id: "cce68f73-c187-4a06-8745-333a529fa54d",
                                      schema: "EnslaverRelationRoleConn",
                                      type: "new"
                                    },
                                    data: {},
                                    state: "new"
                                  },
                                  changes: [
                                    {
                                      kind: "linked",
                                      property:
                                        "EnslaverRelationRoleConn_enslaverrole_id",
                                      changed: {
                                        entityRef: {
                                          type: "existing",
                                          id: 1,
                                          schema: "EnslaverRole"
                                        },
                                        data: {
                                          "Enslaver role": "Captain",
                                          id: 1
                                        },
                                        state: "lazy"
                                      }
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    status: 0,
    reviews: [],
    media: [],
    batch: {
      id: 1,
      title: "Import of Voyage from IOA_Voyages updated sources.csv",
      comments:
        "Batch created for import of Voyage from CSV file IOA_Voyages updated sources.csv",
      published: null
    }
  }
]
