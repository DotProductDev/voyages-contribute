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

    // Voyage Ship data.
    {
      kind: "owned",
      targetField: "Ship",
      importUpdates: [
        {
          kind: "direct",
          targetField: "Name of vessel",
          header: "shipname"
        },
        {
          kind: "linked",
          targetField: "National carrier",
          header: "national",
          lookupField: "Code"
        },
        {
          kind: "linked",
          targetField: "Construction place",
          header: "placcons",
          lookupField: "Code"
        },
        {
          kind: "linked",
          targetField: "Registered place",
          header: "placreg",
          lookupField: "Code"
        },
        {
          kind: "linked",
          targetField: "Rig of vessel",
          header: "rig",
          lookupField: "Code"
        },
        {
          kind: "direct",
          targetField: "Tonnage of vessel",
          header: "tonnage"
        },
        {
          kind: "linked",
          targetField: "Ton type",
          header: "tontype",
          lookupField: "Code"
        },
        {
          kind: "direct",
          targetField: "Guns mounted",
          header: "guns"
        },
        {
          kind: "linked",
          targetField: "Nationality",
          header: "natinimp",
          lookupField: "Code"
        }
      ]
    },

    // Crew
    {
      kind: "owned",
      targetField: "Crew",
      importUpdates: [
        {
          kind: "direct",
          targetField: "Crew at voyage outset",
          header: "crew1"
        },
        {
          kind: "direct",
          targetField: "Crew at departure from last port of slave purchase",
          header: "crew2"
        },
        {
          kind: "direct",
          targetField: "Crew at first landing of captives",
          header: "crew3"
        },
        {
          kind: "direct",
          targetField: "Crew died during complete voyage",
          header: "crewdied"
        }
      ]
    },

    // Outcome
    {
      kind: "owned",
      targetField: "Outcome",
      importUpdates: [
        {
          kind: "linked",
          targetField: "Particular outcome",
          header: "fate",
          lookupField: "Value"
        },
        {
          kind: "linked",
          targetField: "Resistance",
          header: "resistance",
          lookupField: "Value"
        },
        {
          kind: "linked",
          targetField: "Enslaved outcome",
          header: "fate2",
          lookupField: "Value"
        },
        {
          kind: "linked",
          targetField: "Vessel outcome",
          header: "fate3",
          lookupField: "Value"
        },
        {
          kind: "linked",
          targetField: "Owner outcome",
          header: "fate4",
          lookupField: "Value"
        }
      ]
    },

    // Itinerary
    {
      kind: "owned",
      targetField: "Itinerary",
      importUpdates: [
        {
          kind: "linked",
          targetField: "First intended port of embarkation",
          header: "embport",
          lookupField: "Code"
        },
        {
          kind: "linked",
          targetField: "Second intended port of embarkation",
          header: "embport2",
          lookupField: "Code"
        },
        {
          kind: "linked",
          targetField: "First intended port of disembarkation",
          header: "arrport",
          lookupField: "Code"
        },
        {
          kind: "linked",
          targetField: "Second intended port of disembarkation",
          header: "arrport2",
          lookupField: "Code"
        },
        {
          kind: "linked",
          targetField: "Port of departure",
          header: "portdep",
          lookupField: "Code"
        },
        {
          kind: "direct",
          targetField: "Number of ports of call prior to buying captives",
          header: "nppretra"
        },
        {
          kind: "linked",
          targetField: "First place of slave purchase",
          header: "plac1tra",
          lookupField: "Code"
        },
        {
          kind: "linked",
          targetField: "Second place of slave purchase",
          header: "plac2tra",
          lookupField: "Code"
        },
        {
          kind: "linked",
          targetField: "Third place of slave purchase",
          header: "plac3tra",
          lookupField: "Code"
        },
        {
          kind: "linked",
          targetField: "Principal place of slave purchase",
          header: "majbuypt",
          lookupField: "Code"
        },
        {
          kind: "linked",
          targetField: "First place of slave landing",
          header: "sla1port",
          lookupField: "Code"
        },
        {
          kind: "linked",
          targetField: "Second place of slave landing",
          header: "adpsale1",
          lookupField: "Code"
        },
        {
          kind: "linked",
          targetField: "Third place of slave landing",
          header: "adpsale2",
          lookupField: "Code"
        },
        {
          kind: "linked",
          targetField: "Principal port of slave disembarkation",
          header: "majselpt",
          lookupField: "Code"
        },
        {
          kind: "linked",
          targetField: "Place at which voyage ended",
          header: "portret",
          lookupField: "Code"
        }
      ]
    },

    // Dates

    {
      kind: "owned",
      targetField: "Dates",
      importUpdates: [
        {
          kind: "direct",
          targetField:
            "Voyage length from last slave embarkation to first disembarkation (days)",
          header: "voyage"
        },
        {
          kind: "multiple",
          bindings: [
            {
              $dateHeader: "datedep",
              $targetField: "Date that voyage began"
            },
            {
              $dateHeader: "dateend",
              $targetField: "Date on which slave voyage completed"
            },
            {
              $dateHeader: "datebuy",
              $targetField: "Date that slave purchase began"
            },
            {
              $dateHeader: "dateleftafr",
              $targetField: "Date vessel departed Africa"
            }
          ],
          mappings: [
            {
              kind: "linked",
              targetField: "$targetField",
              header: "$dateHeader",
              lookupField: "",
              createIfMissing: {
                kind: "owned",
                importUpdates: [
                  {
                    kind: "direct",
                    targetField: "Year",
                    header: "$dateHeader",
                    formula: (d: string) => {
                      if (d.length < 4) {
                        return null
                      }
                      const m = d.match(/^(\d{4})/)
                      return m ? m[1] : null
                    }
                  },
                  {
                    kind: "direct",
                    targetField: "Month",
                    header: "$dateHeader",
                    formula: (d: string) => {
                      if (d.length < 4) {
                        return null
                      }
                      const m = d.match(/^\d{4}-(\d{2})/)
                      return m ? m[1] : null
                    }
                  },
                  {
                    kind: "direct",
                    targetField: "Day",
                    header: "$dateHeader",
                    formula: (d: string) => {
                      if (d.length < 4) {
                        return null
                      }
                      const m = d.match(/^\d{4}-\d{2}-(\d{2})/)
                      return m ? m[1] : null
                    }
                  }
                ]
              }
            }
          ]
        }
      ]
    },

    // Generate EnslaverRelationship changes with deeply nested entries for
    // each Enslaver with its role. Both aliases and identities are created if no
    // match is EntityNotFoundError.

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
                  mode: "linked",
                  value: 1 // 1 => Transportation
                },
                {
                  kind: "multiple",
                  bindings: [
                    {
                      $enslaver: "ownera",
                      $enslaverRoleId: "4"
                    },
                    {
                      $enslaver: "ownerb",
                      $enslaverRoleId: "4"
                    },
                    {
                      $enslaver: "ownerc",
                      $enslaverRoleId: "4"
                    },
                    {
                      $enslaver: "ownerd",
                      $enslaverRoleId: "4"
                    },
                    {
                      $enslaver: "ownere",
                      $enslaverRoleId: "4"
                    },
                    {
                      $enslaver: "captaina",
                      $enslaverRoleId: "1"
                    },
                    {
                      $enslaver: "captainb",
                      $enslaverRoleId: "1"
                    },
                    {
                      $enslaver: "captainc",
                      $enslaverRoleId: "1"
                    }
                  ],
                  mappings: [
                    {
                      kind: "conditional",
                      anyNonEmpty: ["$enslaver"],
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
                                    canonicalId: [
                                      {
                                        kind: "const",
                                        value: "CanonicalEnslaverAliasId_"
                                      },
                                      {
                                        kind: "direct",
                                        header: "$enslaver"
                                      }
                                    ],
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
                                          canonicalId: [
                                            {
                                              kind: "const",
                                              value:
                                                "CanonicalEnslaverIdentityId_"
                                            },
                                            {
                                              kind: "direct",
                                              header: "$enslaver"
                                            }
                                          ],
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
                                },
                                {
                                  kind: "ownedList",
                                  targetField: "Roles",
                                  addedToList: [
                                    {
                                      kind: "owned",
                                      importUpdates: [
                                        {
                                          kind: "const",
                                          mode: "linked",
                                          targetField: "Role",
                                          value: "$enslaverRoleId"
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
        }
      ]
    }
  ]
}
