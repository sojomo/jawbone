/* 
 * NODES 
 */

// Dates
const dates = {
}

// Events
const events = {
}

// Locations
const locations = {
  "Amsterdam": "",
  "London": "",
  "Hodder": "",
}

// Objects
const objects = {
  "Aquarius pen": "Seems to be a brand",
  "17600": "Spelled out as a number",
  "second pill": "he took his second pill on page 3",
}

// People
const people = {
  "Casy Ferris": "",
  "Henry": "",
  "Clement": "",
  "Austin Freeman": "",
  "Oppenheim": "",
  "Mary Roberts Reinhart": "",
  "My mother": "",
}


// Pages
const pages = {
  p1: "No notes",
  p2: "No notes",
  p3: "No notes",
}

/*
 * LINKS
 */

// ID appears on page pNUM
const on_page = [
  ["Casy Ferris", "p1"],
  ["Aquarius pen", "p1"],
  ["Amsterdam", "p1"],
  ["London", "p2"],
  ["Henry", "p2"],
  ["Clement", "p3"],
  ["17600", "p3"],
  ["Clement", "p3"],
  ["Austin Freeman", "p3"],
  ["Oppenheim", "p3"],
  ["Mary Roberts Reinhart", "p3"],
  ["Hodder", "p3"],
  ["My mother", "p3"],
  ["second pill", "p3"],
]

// ID was in/is related to ID
const at_location = [
]

/*
 * No need to touch this
 */
const graphData = {
  nodes: [
    // Dates
    ...Object.entries(dates).map(([id, notes]) => ({
      id: id, name: id, type: "date", notes
    })),
    // Events
    ...Object.entries(events).map(([id, notes]) => ({
      id: id, name: id, type: "event", notes
    })),
    // Locations
    ...Object.entries(locations).map(([id, notes]) => ({
      id: id, name: id, type: "location", notes
    })),
    // Objects
    ...Object.entries(objects).map(([id, notes]) => ({
      id: id, name: id, type: "object", notes
    })),
    // People
    ...Object.entries(people).map(([id, notes]) => ({
      id: id, name: id, type: "person", notes
    })),
    // Pages
    ...Object.entries(pages).map(([id, notes]) => ({
      id: id, name: id, type: "page", notes
    })),
  ],
  links: [
    ...on_page.map(link => ({ source: link[0], target: link[1], type: "on_page" })),
    ...at_location.map(link => ({ source: link[0], target: link[1], type: "at_location" })),
  ]
}

const nodeTypes = [
  "date",
  "event", 
  "location",
  "object",
  "page",
  "person",
]


