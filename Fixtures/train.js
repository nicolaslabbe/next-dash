function add(i, iso) {
  var date = new Date()
  var d2 = new Date(date)
  d2.setMinutes(date.getMinutes() + i)
  if (iso) {
    return d2.toISOString()
  }else {
    return d2.getTime()
  }
}

export default () => {
  var date = new Date()

  return { 
    "Villiers-le-Bel-Gonesse (Arnouville)": {
      name: "Gare-de-Lyon-RER-D",
      departures: [
        {
          time: add(1),
          formatted: add(1, true),
          direction: "Melun (Melun)",
          line: "D",
          color: "5E9620"
        }
      ]
    },
    "Melun (Melun)": {
      name: "Gare-de-Lyon-RER-D",
      departures: [
        {
          time: add(2),
          formatted: add(2, true),
          direction: "Melun (Melun)",
          line: "D",
          color: "5E9620"
        },
        {
          time: add(5),
          formatted: add(5, true),
          direction: "Melun (Melun)",
          line: "D",
          color: "5E9620"
        },
        {
          time: add(15),
          formatted: add(15, true),
          direction: "Melun (Melun)",
          line: "D",
          color: "5E9620"
        },
        {
          time: add(25),
          formatted: add(25, true),
          direction: "Melun (Melun)",
          line: "D",
          color: "5E9620"
        },
        {
          time: add(33),
          formatted: add(33, true),
          direction: "Melun (Melun)",
          line: "D",
          color: "5E9620"
        },
        {
          time: add(44),
          formatted: add(44, true),
          direction: "Melun (Melun)",
          line: "D",
          color: "5E9620"
        }
      ]
    },
    "Goussainville (Goussainville)": {
      name: "Gare-de-Lyon-RER-D",
      departures: [
        {
          time: add(1),
          formatted: add(1, true),
          direction: "Melun (Melun)",
          line: "D",
          color: "5E9620"
        },
        {
          time: add(10),
          formatted: add(10, true),
          direction: "Melun (Melun)",
          line: "D",
          color: "5E9620"
        },
        {
          time: add(21),
          formatted: add(21, true),
          direction: "Melun (Melun)",
          line: "D",
          color: "5E9620"
        },
        {
          time: add(30),
          formatted: add(30, true),
          direction: "Melun (Melun)",
          line: "D",
          color: "5E9620"
        }
      ]
    }
  }
}