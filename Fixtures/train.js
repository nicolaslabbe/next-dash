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

module.exports = () => {
  var date = new Date()

  return [
      [
          {
              "stopId": 87682153,
              "terminus": "Goussainville (Goussainville)",
              "station": "Lieusaint-Moissy",
              "code": "D",
              "color": "5E9620",
              "name": "Melun vers Goussainville (RER D)",
              "departures": [
                  {
                      time: add(1),
                      formatted: add(1, true)
                  },
                  {
                      time: add(3),
                      formatted: add(3, true)
                  },
                  {
                      time: add(10),
                      formatted: add(10, true)
                  },
                  {
                      time: add(25),
                      formatted: add(25, true)
                  }
              ]
          },
          {
              "stopId": 87682153,
              "terminus": "Stade-France-St-Denis (Saint-Denis)",
              "station": "Lieusaint-Moissy",
              "code": "D",
              "color": "5E9620",
              "name": "Melun vers Stade-France-St-Denis (RER D)",
              "departures": [
                  {
                      time: add(3),
                      formatted: add(3, true)
                  },
                  {
                      time: add(12),
                      formatted: add(12, true)
                  },
                  {
                      time: add(25),
                      formatted: add(25, true)
                  }
              ]
          },
          {
              "stopId": 87682153,
              "terminus": "Gare-de-Lyon-RER-D (Paris)",
              "station": "Lieusaint-Moissy",
              "code": "D",
              "color": "5E9620",
              "name": "Melun vers Gare-de-Lyon-RER-D (RER D)",
              "departures": [
                  {
                      time: add(4),
                      formatted: add(4, true)
                  },
                  {
                      time: add(9),
                      formatted: add(9, true)
                  },
                  {
                      time: add(15),
                      formatted: add(15, true)
                  },
                  {
                      time: add(26),
                      formatted: add(26, true)
                  }
              ]
          }
      ],
      [
          {
              "stopId": 87686006,
              "terminus": "Corbeil-Essonnes (Corbeil-Essonnes)",
              "station": "Gare-de-Lyon-RER-D",
              "code": "D",
              "color": "5E9620",
              "name": "Orry-la-Ville-Coye vers Corbeil-Essonnes (RER D)",
              "departures": [
                  {
                      time: add(2),
                      formatted: add(2, true)
                  },
                  {
                      time: add(6),
                      formatted: add(6, true)
                  },
                  {
                      time: add(14),
                      formatted: add(14, true)
                  },
                  {
                      time: add(25),
                      formatted: add(25, true)
                  }
              ]
          },
          {
              "stopId": 87686006,
              "terminus": "Melun (Melun)",
              "station": "Gare-de-Lyon-RER-D",
              "code": "D",
              "color": "5E9620",
              "name": "Goussainville vers Melun (RER D)",
              "departures": [
                  {
                      time: add(3),
                      formatted: add(3, true)
                  },
                  {
                      time: add(8),
                      formatted: add(8, true)
                  },
                  {
                      time: add(12),
                      formatted: add(12, true)
                  }
              ]
          }
      ]
  ]
}