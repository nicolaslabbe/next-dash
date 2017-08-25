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

  return {
    "degree": 29.62,
    "humidity": 35,
    "label": "Clouds",
    "description": "few clouds",
    "time": add(1),
    "icon": "02d",
    "wind": 4.77,
    "futur": [
      {
        "degree": 25.92,
        "humidity": 40,
        "label": "Clouds",
        "description": "broken clouds",
        "icon": "04n",
        "time": add(1 * (3 * 60)),
        "wind": 4.31
      },
      {
        "degree": 23.83,
        "humidity": 46,
        "label": "Rain",
        "description": "light rain",
        "icon": "10n",
        "time": add(2 * (3 * 60)),
        "wind": 4.38
      },
      {
        "degree": 23.02,
        "humidity": 40,
        "label": "Clouds",
        "description": "overcast clouds",
        "icon": "04n",
        "time": add(3 * (3 * 60)),
        "wind": 3.36
      },
      {
        "degree": 22.95,
        "humidity": 39,
        "label": "Clouds",
        "description": "overcast clouds",
        "icon": "04d",
        "time": add(4 * (3 * 60)),
        "wind": 5.13
      },
      {
        "degree": 23.02,
        "humidity": 52,
        "label": "Rain",
        "description": "light rain",
        "icon": "10d",
        "time": add(5 * (3 * 60)),
        "wind": 8.06
      },
      {
        "degree": 22.92,
        "humidity": 66,
        "label": "Rain",
        "description": "light rain",
        "icon": "10d",
        "time": add(6 * (3 * 60)),
        "wind": 7.95
      },
      {
        "degree": 20.31,
        "humidity": 89,
        "label": "Rain",
        "description": "moderate rain",
        "icon": "10d",
        "time": add(7 * (3 * 60)),
        "wind": 7.02
      },
      {
        "degree": 21.82,
        "humidity": 81,
        "label": "Rain",
        "description": "moderate rain",
        "icon": "10d",
        "time": add(8 * (3 * 60)),
        "wind": 4.73
      },
      {
        "degree": 19.88,
        "humidity": 87,
        "label": "Rain",
        "description": "light rain",
        "icon": "10n",
        "time": add(9 * (3 * 60)),
        "wind": 6.07
      },
      {
        "degree": 17.51,
        "humidity": 92,
        "label": "Rain",
        "description": "light rain",
        "icon": "10n",
        "time": add(10 * (3 * 60)),
        "wind": 7.06
      },
      {
        "degree": 16.7,
        "humidity": 96,
        "label": "Rain",
        "description": "light rain",
        "icon": "10n",
        "time": add(11 * (3 * 60)),
        "wind": 4.21
      },
      {
        "degree": 14.84,
        "humidity": 96,
        "label": "Rain",
        "description": "light rain",
        "icon": "10d",
        "time": add(12 * (3 * 60)),
        "wind": 5.11
      },
      {
        "degree": 13.96,
        "humidity": 89,
        "label": "Rain",
        "description": "light rain",
        "icon": "10d",
        "time": add(13 * (3 * 60)),
        "wind": 6.22
      },
      {
        "degree": 15.66,
        "humidity": 82,
        "label": "Clouds",
        "description": "scattered clouds",
        "icon": "03d",
        "time": add(14 * (3 * 60)),
        "wind": 7.96
      },
      {
        "degree": 14.4,
        "humidity": 89,
        "label": "Rain",
        "description": "light rain",
        "icon": "10d",
        "time": add(15 * (3 * 60)),
        "wind": 8.66
      },
      {
        "degree": 13.42,
        "humidity": 85,
        "label": "Rain",
        "description": "light rain",
        "icon": "10d",
        "time": add(16 * (3 * 60)),
        "wind": 7.26
      },
      {
        "degree": 11.55,
        "humidity": 97,
        "label": "Rain",
        "description": "light rain",
        "icon": "10n",
        "time": add(17 * (3 * 60)),
        "wind": 9.81
      },
      {
        "degree": 12.61,
        "humidity": 97,
        "label": "Rain",
        "description": "light rain",
        "icon": "10n",
        "time": add(18 * (3 * 60)),
        "wind": 6.82
      },
      {
        "degree": 11.36,
        "humidity": 96,
        "label": "Rain",
        "description": "light rain",
        "icon": "10n",
        "time": add(19 * (3 * 60)),
        "wind": 5.21
      },
      {
        "degree": 11.16,
        "humidity": 98,
        "label": "Rain",
        "description": "light rain",
        "icon": "10d",
        "time": add(20 * (3 * 60)),
        "wind": 4.86
      },
      {
        "degree": 13.24,
        "humidity": 93,
        "label": "Rain",
        "description": "light rain",
        "icon": "10d",
        "time": add(21 * (3 * 60)),
        "wind": 5.29
      },
      {
        "degree": 16.15,
        "humidity": 85,
        "label": "Clouds",
        "description": "scattered clouds",
        "icon": "03d",
        "time": add(22 * (3 * 60)),
        "wind": 5.76
      },
      {
        "degree": 16.94,
        "humidity": 81,
        "label": "Rain",
        "description": "light rain",
        "icon": "10d",
        "time": add(23 * (3 * 60)),
        "wind": 6.25
      },
      {
        "degree": 16.5,
        "humidity": 75,
        "label": "Clouds",
        "description": "broken clouds",
        "icon": "04d",
        "time": add(24 * (3 * 60)),
        "wind": 6.07
      },
      {
        "degree": 15.3,
        "humidity": 73,
        "label": "Clouds",
        "description": "few clouds",
        "icon": "02n",
        "time": add(25 * (3 * 60)),
        "wind": 4.51
      },
      {
        "degree": 12.88,
        "humidity": 79,
        "label": "Clouds",
        "description": "scattered clouds",
        "icon": "03n",
        "time": add(26 * (3 * 60)),
        "wind": 3.16
      },
      {
        "degree": 10.88,
        "humidity": 87,
        "label": "Clear",
        "description": "clear sky",
        "icon": "01n",
        "time": add(27 * (3 * 60)),
        "wind": 3.02
      },
      {
        "degree": 9.46,
        "humidity": 92,
        "label": "Clear",
        "description": "clear sky",
        "icon": "01d",
        "time": add(28 * (3 * 60)),
        "wind": 2.71
      },
      {
        "degree": 15.56,
        "humidity": 79,
        "label": "Clouds",
        "description": "few clouds",
        "icon": "02d",
        "time": add(29 * (3 * 60)),
        "wind": 3.01
      },
      {
        "degree": 19.17,
        "humidity": 72,
        "label": "Clouds",
        "description": "scattered clouds",
        "icon": "03d",
        "time": add(30 * (3 * 60)),
        "wind": 4.92
      },
      {
        "degree": 20.71,
        "humidity": 66,
        "label": "Clouds",
        "description": "few clouds",
        "icon": "02d",
        "time": add(31 * (3 * 60)),
        "wind": 5.12
      },
      {
        "degree": 19.68,
        "humidity": 65,
        "label": "Rain",
        "description": "light rain",
        "icon": "10d",
        "time": add(32 * (3 * 60)),
        "wind": 4.45
      },
      {
        "degree": 16.78,
        "humidity": 87,
        "label": "Rain",
        "description": "light rain",
        "icon": "10n",
        "time": add(33 * (3 * 60)),
        "wind": 3.76
      },
      {
        "degree": 15.48,
        "humidity": 89,
        "label": "Rain",
        "description": "light rain",
        "icon": "10n",
        "time": add(34 * (3 * 60)),
        "wind": 3.76
      },
      {
        "degree": 14.91,
        "humidity": 92,
        "label": "Rain",
        "description": "light rain",
        "icon": "10n",
        "time": add(35 * (3 * 60)),
        "wind": 2.81
      },
      {
        "degree": 13.12,
        "humidity": 99,
        "label": "Rain",
        "description": "moderate rain",
        "icon": "10d",
        "time": add(36 * (3 * 60)),
        "wind": 3.99
      },
      {
        "degree": 11.95,
        "humidity": 93,
        "label": "Rain",
        "description": "light rain",
        "icon": "10d",
        "time": add(37 * (3 * 60)),
        "wind": 6.4
      },
      {
        "degree": 13.29,
        "humidity": 86,
        "label": "Clouds",
        "description": "few clouds",
        "icon": "02d",
        "time": add(38 * (3 * 60)),
        "wind": 6.82
      },
      {
        "degree": 13.1,
        "humidity": 77,
        "label": "Clouds",
        "description": "scattered clouds",
        "icon": "03d",
        "time": add(39 * (3 * 60)),
        "wind": 7.52
      }
    ]
  }
}