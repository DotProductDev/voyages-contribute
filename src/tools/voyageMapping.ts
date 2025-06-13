import { DataMapping } from "./importer"

// Main voyage mapping: configure this to map CSV rows to ChangeSets.
export const voyageMapping: DataMapping = {
  kind: "conditional",
  anyNonEmpty: ["voyageid"], // Only process if we have a voyage ID,
  mappings: [
    // Basic voyage properties (applied once per owner iteration, but will merge)
    {
      kind: "direct",
      targetField: "Voyage ID",
      header: "voyageid"
    },
    {
      kind: "direct",
      targetField: "Dataset",
      header: "intraamer"
    },
    // Advanced scenario: generate EnslaverRelationship.
    {
      kind: "conditional",
      anyNonEmpty: [
        "ownera",
        "ownerb",
        "ownerc",
        "ownerd",
        "ownere",
        "captaina",
        "captainb",
        "captainc"
      ],
      mappings: [
        {
          targetField: "Enslavement relations",
          kind: "ownedList",
          addedToList: [
            {
              kind: "owned",
              importUpdates: [
                {
                  kind: "const",
                  targetField: "Relation type",
                  value: 1 // TODO: check the id that we want to use here
                },
                {
                  kind: "multiple",
                  bindings: [
                    {
                      $enslaver: "ownera"
                    },
                    {
                      $enslaver: "ownerb"
                    },
                    {
                      $enslaver: "ownerc"
                    },
                    {
                      $enslaver: "ownerd"
                    },
                    {
                      $enslaver: "ownere"
                    },
                    {
                      $enslaver: "captaina"
                    },
                    {
                      $enslaver: "captainb"
                    },
                    {
                      $enslaver: "captainc"
                    }
                  ],
                  mappings: [
                    {
                      kind: "ownedList",
                      targetField: "Enslavers in relation",
                      addedToList: [
                        {
                          kind: "owned",
                          importUpdates: [
                            {
                              kind: "linked",
                              targetField: "Enslaver alias",
                              header: "$enslaver",
                              lookupField: "alias",
                              createIfMissing: {
                                kind: "owned",
                                importUpdates: [
                                  {
                                    kind: "direct",
                                    targetField: "Alias",
                                    header: "$enslaver"
                                  },
                                  {
                                    kind: "linked",
                                    targetField: "Identity",
                                    header: "$enslaver",
                                    lookupField: "Principal alias",
                                    createIfMissing: {
                                      kind: "owned",
                                      importUpdates: [
                                        {
                                          kind: "direct",
                                          targetField: "Principal alias",
                                          header: "$enslaver"
                                        }
                                      ]
                                    }
                                  }
                                ]
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
