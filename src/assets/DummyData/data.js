export const data = [
  {
    bankId: "125",
    bankName: "فروش",
    charts: [
      {
        id: "1251",
        title: "سهم فروش",
        type: "Doughnut",
        backGroundColor: [
          "rgba(116, 103, 240, 1)",
          "rgba(255, 165, 80, 1)",
          "rgba(234, 96, 97, 1)",
          "rgba(0, 136, 132, 1)",
          "rgba(152, 148, 215, 1)",
          "#d7cb94",
        ],
        borderColor: [],
        borderWidth: 0,
        database: {
          labels: ["110", "55", "275", "200", "35", "پره"],
          data: [
            {
              label: "ُسهم فروش",
              data: [36, 41, 2, 19, 0, 2],
            },
          ],
        },
        option: {
          maintainAspectRatio: false,
          cutout: "65%",
          plugins: {
            legend: {
              labels: {
                usePointStyle: true,
              },
              display: true,
              rtl: false,
              position: "left",
            },
          },
          scales: {
            title: {
              display: false,
            },
            x: {
              ticks: { display: false },
              grid: {
                display: false,
                drawBorder: false,
              },
            },
            y: {
              ticks: { display: false },
              grid: {
                display: false,
                drawBorder: false,
              },
              // beginAtZero: true,
            },
          },
        },
      },
      {
        id: "1253",
        title: "نمودار خطی فروش ماهانه",
        type: "Line",
        backGroundColor: [
          "rgba(116, 103, 240, 1)",
          "rgba(255, 165, 80, 1)",
          "rgba(234, 96, 97, 1)",
          "rgba(0, 136, 132, 1)",
          "rgba(152, 148, 215, 1)",
        ],
        borderColor: [
          "rgba(116, 103, 240, 1)",
          "rgba(255, 165, 80, 1)",
          "rgba(234, 96, 97, 1)",
          "rgba(0, 136, 132, 1)",
          "rgba(152, 148, 215, 1)",
        ],
        database: {
          labels: [
            "فروردین",
            "اردیبهشت",
            "خرداد",
            "تیر",
            "مرداد",
            // "شهریور",
            // "مهر",
            // "آبان",
            // "آذر",
            // "دی",
            // "بهمن",
            // "اسفند",
          ],
          data: [
            {
              label: "110",
              data: [32, 25, 15, 1],
            },
            {
              label: "550",
              data: [25, 15, 5, 5],
            },
            {
              label: "275",
              data: [2, 1, 1, 1],
            },
            {
              label: "200",
              data: [25, 15, 10, 10],
            },
            {
              label: "35",
              data: [10, 15, 15, 5],
            },
          ],
        },
        option: {
          tension: 0.2,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: {
                usePointStyle: true,
              },
              display: true,
              rtl: false,
              position: "top",
            },
          },
          scales: {
            y: {
              // position: "right",
              beginAtZero: false,
            },
          },
        },
      },
      {
        id: "1254",
        title: "نمودار ستونی فروش ماهانه",
        type: "Bar",
        backGroundColor: [
          "rgba(116, 103, 240, 1)",
          "rgba(255, 165, 80, 1)",
          "rgba(234, 96, 97, 1)",
          "rgba(0, 136, 132, 1)",
          "rgba(152, 148, 215, 1)",
        ],
        borderColor: [],
        borderRadius: 3,
        borderWidth: 0,
        database: {
          labels: [
            "فروردین",
            "اردیبهشت",
            "خرداد",
            "تیر",
            "مرداد",
            // "شهریور",
            // "مهر",
            // "آبان",
            // "آذر",
            // "دی",
            // "بهمن",
            // "اسفند",
          ],
          data: [
            {
              label: "110",
              data: [32, 25, 15, 1],
            },
            {
              label: "550",
              data: [25, 15, 5, 5],
            },
            {
              label: "275",
              data: [2, 1, 1, 1],
            },
            {
              label: "200",
              data: [25, 15, 10, 10],
            },
            {
              label: "35",
              data: [10, 15, 15, 5],
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      },
    ],
  },
];
