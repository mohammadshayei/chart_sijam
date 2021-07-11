export const data = [
  {
    softwareId: "001001001",
    banks: [
      {
        bankId: "001001001333",
        bankName: "رهگیری ساخت و تولید",
        charts: [
          {
            id: "001001001333001",
            title: "ارجاعات",
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
                  label: "ُارجاعات",
                  data: [150, 70, 120, 200, 50, 20],
                },
              ],
            },
            option: {
              maintainAspectRatio: true,
              cutout: "65%",
              plugins: {
                legend: {
                  labels: {
                    usePointStyle: true,
                  },
                  display: true,
                  rtl: false,
                  position: "bottom",
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
            id: "001001001333002",
            title: "کارایی",
            type: "Line",
            backGroundColor: [
              "rgb(75, 192, 192)",
              "rgba(255, 165, 80, 1)",
              "rgba(234, 96, 97, 1)",
              "rgba(0, 136, 132, 1)",
              "rgba(152, 148, 215, 1)",
            ],
            borderColor: [
              "rgb(75, 192, 192)",
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
                "شهریور",
                "مهر",
                "آبان",
                "آذر",
                "دی",
                "بهمن",
                "اسفند",
              ],
              data: [
                {
                  label: "110",
                  data: [65, 59, 80, 81, 56, 55, 40],
                },
                {
                  label: "550",
                  data: [75, 40, 95, 103, 78, 60, 50],
                },
                {
                  label: "275",
                  data: [35, 30, 45, 60, 87, 20, 32],
                },
                {
                  label: "200",
                  data: [15, 15, 20, 40, 25, 58, 40],
                },
                {
                  label: "35",
                  data: [5, 8, 15, 10, 8, 20, 25],
                },
              ],
            },
            option: {
              tension: 0.2,
              maintainAspectRatio: true,
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
            id: "001001001333003",
            title: "ارجاعات هر شاپ",
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
              responsive: true,
              maintainAspectRatio: true,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          },
        ],
      },
      {
        bankId: "001001001448",
        bankName: "آخرین وضعیت دستور تولید",
        charts: [
          {
            id: "001001001448001",
            title: "دستور تولید",
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
                  label: "ُدستور تولید",
                  data: [36, 41, 2, 19, 0, 2],
                },
              ],
            },
            option: {
              maintainAspectRatio: true,
              cutout: "65%",
              plugins: {
                legend: {
                  labels: {
                    usePointStyle: true,
                  },
                  display: true,
                  rtl: false,
                  position: "bottom",
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
            id: "001001001448002",
            title: "نمودار خطی فروش ماهانه", //inja be baad
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
              maintainAspectRatio: true,
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
            id: "001001001448003",
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
              responsive: true,
              maintainAspectRatio: true,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          },
        ],
      },
      {
        bankId: "001001001450",
        bankName: "آخرین وضعیت مراحل تولید",
        charts: [
          {
            id: "001001001450001",
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
              maintainAspectRatio: true,
              cutout: "65%",
              plugins: {
                legend: {
                  labels: {
                    usePointStyle: true,
                  },
                  display: true,
                  rtl: false,
                  position: "bottom",
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
            id: "001001001450002",
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
              maintainAspectRatio: true,
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
            id: "001001001450003",
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
              responsive: true,
              maintainAspectRatio: true,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          },
        ],
      },
    ],
  },
  {
    softwareId: "001001002",
    banks: [
      {
        bankId: "001001002229",
        bankName: "فاکتور فروش قطعی",
        charts: [
          {
            id: "001001002229001",
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
              maintainAspectRatio: true,
              cutout: "65%",
              plugins: {
                legend: {
                  labels: {
                    usePointStyle: true,
                  },
                  display: true,
                  rtl: false,
                  position: "bottom",
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
            id: "001001002229002",
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
              maintainAspectRatio: true,
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
            id: "001001002229003",
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
              responsive: true,
              maintainAspectRatio: true,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          },
        ],
      },
      {
        bankId: "001001002228",
        bankName: "فاکتور خرید قطعی",
        charts: [
          {
            id: "001001002228001",
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
              maintainAspectRatio: true,
              cutout: "65%",
              plugins: {
                legend: {
                  labels: {
                    usePointStyle: true,
                  },
                  display: true,
                  rtl: false,
                  position: "bottom",
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
            id: "001001002228002",
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
              maintainAspectRatio: true,
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
            id: "001001002228003",
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
              responsive: true,
              maintainAspectRatio: true,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          },
        ],
      },
      {
        bankId: "001001002262",
        bankName: "دفتر روزنامه",
        charts: [
          {
            id: "001001002262001",
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
              maintainAspectRatio: true,
              cutout: "65%",
              plugins: {
                legend: {
                  labels: {
                    usePointStyle: true,
                  },
                  display: true,
                  rtl: false,
                  position: "bottom",
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
            id: "001001002262002",
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
              maintainAspectRatio: true,
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
            id: "001001002262003",
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
              responsive: true,
              maintainAspectRatio: true,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          },
        ],
      },
    ],
  },
  {
    softwareId: "001001003",
    banks: [
      {
        bankId: "001001003162",
        bankName: "اطلاعات کالاها",
        charts: [
          {
            id: "001001003162001",
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
              maintainAspectRatio: true,
              cutout: "65%",
              plugins: {
                legend: {
                  labels: {
                    usePointStyle: true,
                  },
                  display: true,
                  rtl: false,
                  position: "bottom",
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
            id: "001001003162002",
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
              maintainAspectRatio: true,
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
            id: "001001003162003",
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
              responsive: true,
              maintainAspectRatio: true,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          },
        ],
      },
      {
        bankId: "001001003165",
        bankName: "حواله انبار قطعی",
        charts: [
          {
            id: "001001003165001",
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
              maintainAspectRatio: true,
              cutout: "65%",
              plugins: {
                legend: {
                  labels: {
                    usePointStyle: true,
                  },
                  display: true,
                  rtl: false,
                  position: "bottom",
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
            id: "001001003165002",
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
              maintainAspectRatio: true,
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
            id: "001001003165003",
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
              responsive: true,
              maintainAspectRatio: true,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          },
        ],
      },
      {
        bankId: "001001003179",
        bankName: "رسید برگشتی قطعی",
        charts: [
          {
            id: "001001003179001",
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
              maintainAspectRatio: true,
              cutout: "65%",
              plugins: {
                legend: {
                  labels: {
                    usePointStyle: true,
                  },
                  display: true,
                  rtl: false,
                  position: "bottom",
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
            id: "001001003179002",
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
              maintainAspectRatio: true,
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
            id: "001001003179003",
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
              responsive: true,
              maintainAspectRatio: true,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          },
        ],
      },
      {
        bankId: "001001003199",
        bankName: "کاردکس کل",
        charts: [
          {
            id: "001001003199001",
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
              maintainAspectRatio: true,
              cutout: "65%",
              plugins: {
                legend: {
                  labels: {
                    usePointStyle: true,
                  },
                  display: true,
                  rtl: false,
                  position: "bottom",
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
            id: "001001003199002",
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
              maintainAspectRatio: true,
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
            id: "001001003199003",
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
              responsive: true,
              maintainAspectRatio: true,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          },
        ],
      },
    ],
  },
  {
    softwareId: "001001004",
    banks: [
      {
        bankId: "001001004143",
        bankName: "سند حسابداری",
        charts: [
          {
            id: "001001004143001",
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
              maintainAspectRatio: true,
              cutout: "65%",
              plugins: {
                legend: {
                  labels: {
                    usePointStyle: true,
                  },
                  display: true,
                  rtl: false,
                  position: "bottom",
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
            id: "001001004143002",
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
              maintainAspectRatio: true,
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
            id: "001001004143003",
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
              responsive: true,
              maintainAspectRatio: true,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          },
        ],
      },
      {
        bankId: "001001004303",
        bankName: "فاکتور خرید قطعی",
        charts: [
          {
            id: "001001004303001",
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
              maintainAspectRatio: true,
              cutout: "65%",
              plugins: {
                legend: {
                  labels: {
                    usePointStyle: true,
                  },
                  display: true,
                  rtl: false,
                  position: "bottom",
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
            id: "001001004303002",
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
              maintainAspectRatio: true,
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
            id: "001001004303003",
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
              responsive: true,
              maintainAspectRatio: true,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          },
        ],
      },
      {
        bankId: "001001004302",
        bankName: "برگ رسید صندوق",
        charts: [
          {
            id: "001001004302001",
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
              maintainAspectRatio: true,
              cutout: "65%",
              plugins: {
                legend: {
                  labels: {
                    usePointStyle: true,
                  },
                  display: true,
                  rtl: false,
                  position: "bottom",
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
            id: "001001004302002",
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
              maintainAspectRatio: true,
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
            id: "001001004302003",
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
              responsive: true,
              maintainAspectRatio: true,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          },
        ],
      },
    ],
  },
  {
    softwareId: "001002001",
    banks: [
      {
        bankId: "001002001333",
        bankName: "رهگیری ساخت و تولید",
        charts: [
          {
            id: "001002001333001",
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
              maintainAspectRatio: true,
              cutout: "65%",
              plugins: {
                legend: {
                  labels: {
                    usePointStyle: true,
                  },
                  display: true,
                  rtl: false,
                  position: "bottom",
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
            id: "001002001333002",
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
              maintainAspectRatio: true,
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
            id: "001002001333003",
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
              responsive: true,
              maintainAspectRatio: true,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          },
        ],
      },
    ],
  },
  {
    softwareId: "001002002",
    banks: [
      {
        bankId: "001002002262",
        bankName: "دفترروزنامه",
        charts: [
          {
            id: "001002002262001",
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
              maintainAspectRatio: true,
              cutout: "65%",
              plugins: {
                legend: {
                  labels: {
                    usePointStyle: true,
                  },
                  display: true,
                  rtl: false,
                  position: "bottom",
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
            id: "001002002262002",
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
              maintainAspectRatio: true,
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
            id: "001002002262003",
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
              responsive: true,
              maintainAspectRatio: true,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          },
        ],
      },
    ],
  },
  {
    softwareId: "001002003",
    banks: [
      {
        bankId: "001002003162",
        bankName: "اطلاعات کالاها",
        charts: [
          {
            id: "001002003162001",
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
              maintainAspectRatio: true,
              cutout: "65%",
              plugins: {
                legend: {
                  labels: {
                    usePointStyle: true,
                  },
                  display: true,
                  rtl: false,
                  position: "bottom",
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
            id: "001002003162002",
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
              maintainAspectRatio: true,
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
            id: "001002003162003",
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
              responsive: true,
              maintainAspectRatio: true,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          },
        ],
      },
    ],
  },
  {
    softwareId: "001002004",
    banks: [
      {
        bankId: "001002004143",
        bankName: "سند حسابداری",
        charts: [
          {
            id: "001002004143001",
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
              maintainAspectRatio: true,
              cutout: "65%",
              plugins: {
                legend: {
                  labels: {
                    usePointStyle: true,
                  },
                  display: true,
                  rtl: false,
                  position: "bottom",
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
            id: "001002004143002",
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
              maintainAspectRatio: true,
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
            id: "001002004143003",
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
              responsive: true,
              maintainAspectRatio: true,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          },
        ],
      },
    ],
  },
  {
    softwareId: "001003002",
    banks: [
      {
        bankId: "001003002229",
        bankName: "فاکتور فروش قطعی",
        charts: [
          {
            id: "001003002229001",
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
              maintainAspectRatio: true,
              cutout: "65%",
              plugins: {
                legend: {
                  labels: {
                    usePointStyle: true,
                  },
                  display: true,
                  rtl: false,
                  position: "bottom",
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
            id: "001003002229002",
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
              maintainAspectRatio: true,
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
            id: "001003002229003",
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
              responsive: true,
              maintainAspectRatio: true,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          },
        ],
      },
      {
        bankId: "001003002262",
        bankName: "دفترروزنامه",
        charts: [
          {
            id: "001003002262001",
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
              maintainAspectRatio: true,
              cutout: "65%",
              plugins: {
                legend: {
                  labels: {
                    usePointStyle: true,
                  },
                  display: true,
                  rtl: false,
                  position: "bottom",
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
            id: "001003002262002",
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
              maintainAspectRatio: true,
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
            id: "001003002262003",
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
              responsive: true,
              maintainAspectRatio: true,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          },
        ],
      },
      {
        bankId: "001003002228",
        bankName: "فاکتور خرید قطعی",
        charts: [
          {
            id: "001003002228001",
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
              maintainAspectRatio: true,
              cutout: "65%",
              plugins: {
                legend: {
                  labels: {
                    usePointStyle: true,
                  },
                  display: true,
                  rtl: false,
                  position: "bottom",
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
            id: "001003002228002",
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
              maintainAspectRatio: true,
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
            id: "001003002228003",
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
              responsive: true,
              maintainAspectRatio: true,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          },
        ],
      },
    ],
  },
  {
    softwareId: "001004002",
    banks: [
      {
        bankId: "001004002229",
        bankName: "فاکتور فروش قطعی",
        charts: [
          {
            id: "001004002229001",
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
              maintainAspectRatio: true,
              cutout: "65%",
              plugins: {
                legend: {
                  labels: {
                    usePointStyle: true,
                  },
                  display: true,
                  rtl: false,
                  position: "bottom",
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
            id: "001004002229002",
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
              maintainAspectRatio: true,
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
            id: "001004002229003",
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
              responsive: true,
              maintainAspectRatio: true,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          },
        ],
      },
    ],
  },
  {
    softwareId: "001004003",
    banks: [
      {
        bankId: "001004003162",
        bankName: "اطلاعات کالاها",
        charts: [
          {
            id: "001004003162001",
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
              maintainAspectRatio: true,
              cutout: "65%",
              plugins: {
                legend: {
                  labels: {
                    usePointStyle: true,
                  },
                  display: true,
                  rtl: false,
                  position: "bottom",
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
            id: "001004003162002",
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
              maintainAspectRatio: true,
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
            id: "001004003162003",
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
              responsive: true,
              maintainAspectRatio: true,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          },
        ],
      },
    ],
  },
];
