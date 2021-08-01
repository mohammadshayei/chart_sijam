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
            data: [
              {
                category: "110",
                value: 150,
              },
              {
                category: "55",
                value: 70,
              },
              {
                category: "275",
                value: 120,
              },
              {
                category: "200",
                value: 200,
              },
              {
                category: "35",
                value: 50,
              },
              {
                category: "پره",
                value: 20,
              },
            ],
            options: {
              radius: 70,
              innerRadius: 40,
              startAngle: 180,
              endAngle: 360,
              insideLabel: true,
              legend: {
                display: true,
                position: "right",
                valueLabelsText: " : {value}",
              },
              series: {
                alignLabels: false,
                labels: {
                  bent: true,
                  radius: -20,
                  padding: 0,
                  disabled: false,
                  text: "{category}",
                  color: "#fff",
                  maxWidth: 130,
                  wrap: true,
                },
              },
              slices: {
                draggable: false,
                tooltip: {
                  display: true,
                  text: "{category}: {value.value}",
                },
                cornerRadius: 10,
                innerCornerRadius: 7,
              },
            },
          },
          {
            id: "001001001333002",
            title: "کارایی",
            type: "Line",
            data: [
              {
                category: "فروردین",
                field1: 65,
                field2: 75,
                field3: 35,
                field4: 15,
                field5: 5,
              },
              {
                category: "اردیبهشت",
                field1: 59,
                field2: 40,
                field3: 30,
                field4: 15,
                field5: 8,
              },
              {
                category: "خرداد",
                field1: 80,
                field2: 95,
                field3: 45,
                field4: 20,
                field5: 15,
              },
              {
                category: "تیر",
                field1: 81,
                field2: 103,
                field3: 60,
                field4: 40,
                field5: 10,
              },
              {
                category: "مرداد",
                field1: 56,
                field2: 78,
                field3: 87,
                field4: 25,
                field5: 8,
              },
              {
                category: "شهریور",
                field1: 55,
                field2: 60,
                field3: 20,
                field4: 58,
                field5: 20,
              },
              {
                category: "مهر",
                field1: 40,
                field2: 50,
                field3: 32,
                field4: 40,
                field5: 25,
              },
              {
                category: "آبان",
                field1: 0,
                field2: 0,
                field3: 0,
                field4: 0,
                field5: 0,
              },
              {
                category: "آذر",
                field1: 0,
                field2: 0,
                field3: 0,
                field4: 0,
                field5: 0,
              },
              {
                category: "دی",
                field1: 0,
                field2: 0,
                field3: 0,
                field4: 0,
                field5: 0,
              },
              {
                category: "بهمن",
                field1: 0,
                field2: 0,
                field3: 0,
                field4: 0,
                field5: 0,
              },
              {
                category: "اسفند",
                field1: 0,
                field2: 0,
                field3: 0,
                field4: 0,
                field5: 0,
              },
            ],
            options: {
              fieldNames: {
                field1: "md110",
                field2: "md550",
                field3: "md275",
                field4: "md200",
                field5: "md35",
              },
              legend: { display: true },
              xyCursor: true,
              xAxes: { minGridDistance: 30, gridTemplateLocation: 0 },
              series: {
                strokeWidth: 2,
                smoothing: "monotoneX",
                bullet: {
                  display: true,
                  strokeColor: "#fff",
                  strokeWidth: 0,
                },
              },
            },
          },
          {
            id: "001001001333003",
            title: "ارجاعات هر شاپ",
            type: "Column",
            data: [
              {
                category: "فروردین",
                field1: 65,
                field2: 75,
                field3: 35,
                field4: 15,
                field5: 5,
              },
              {
                category: "اردیبهشت",
                field1: 59,
                field2: 40,
                field3: 30,
                field4: 15,
                field5: 8,
              },
              {
                category: "خرداد",
                field1: 80,
                field2: 95,
                field3: 45,
                field4: 20,
                field5: 15,
              },
              {
                category: "تیر",
                field1: 81,
                field2: 103,
                field3: 60,
                field4: 40,
                field5: 10,
              },
              {
                category: "مرداد",
                field1: 56,
                field2: 78,
                field3: 87,
                field4: 25,
                field5: 8,
              },
              {
                category: "شهریور",
                field1: 55,
                field2: 60,
                field3: 20,
                field4: 58,
                field5: 20,
              },
              {
                category: "مهر",
                field1: 40,
                field2: 50,
                field3: 32,
                field4: 40,
                field5: 25,
              },
              {
                category: "آبان",
                field1: 0,
                field2: 0,
                field3: 0,
                field4: 0,
                field5: 0,
              },
              {
                category: "آذر",
                field1: 0,
                field2: 0,
                field3: 0,
                field4: 0,
                field5: 0,
              },
              {
                category: "دی",
                field1: 0,
                field2: 0,
                field3: 0,
                field4: 0,
                field5: 0,
              },
              {
                category: "بهمن",
                field1: 0,
                field2: 0,
                field3: 0,
                field4: 0,
                field5: 0,
              },
              {
                category: "اسفند",
                field1: 0,
                field2: 0,
                field3: 0,
                field4: 0,
                field5: 0,
              },
            ],
            options: {
              fieldNames: {
                field1: "md110",
                field2: "md550",
                field3: "md275",
                field4: "md200",
                field5: "md35",
              },
              xyCursor: false,
              legend: { display: true },
              xAxes: { minGridDistance: 60, gridTemplateLocation: 0 },
              series: {
                stacked: true,
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
            type: "Radar",
            data: [
              {
                category: "فروردین",
                field1: 65,
                field2: 75,
                field3: 35,
                field4: 15,
                field5: 5,
              },
              {
                category: "اردیبهشت",
                field1: 59,
                field2: 40,
                field3: 30,
                field4: 15,
                field5: 8,
              },
              {
                category: "خرداد",
                field1: 80,
                field2: 95,
                field3: 45,
                field4: 20,
                field5: 15,
              },
              {
                category: "تیر",
                field1: 81,
                field2: 103,
                field3: 60,
                field4: 40,
                field5: 10,
              },
              {
                category: "مرداد",
                field1: 56,
                field2: 78,
                field3: 87,
                field4: 25,
                field5: 8,
              },
              {
                category: "شهریور",
                field1: 55,
                field2: 60,
                field3: 20,
                field4: 58,
                field5: 20,
              },
              {
                category: "مهر",
                field1: 40,
                field2: 50,
                field3: 32,
                field4: 40,
                field5: 25,
              },
              {
                category: "آبان",
                field1: 0,
                field2: 0,
                field3: 0,
                field4: 0,
                field5: 0,
              },
              {
                category: "آذر",
                field1: 0,
                field2: 0,
                field3: 0,
                field4: 0,
                field5: 0,
              },
              {
                category: "دی",
                field1: 0,
                field2: 0,
                field3: 0,
                field4: 0,
                field5: 0,
              },
              {
                category: "بهمن",
                field1: 0,
                field2: 0,
                field3: 0,
                field4: 0,
                field5: 0,
              },
              {
                category: "اسفند",
                field1: 0,
                field2: 0,
                field3: 0,
                field4: 0,
                field5: 0,
              },
            ],
            options: {
              fieldNames: {
                field1: "md110",
                field2: "md550",
                field3: "md275",
                field4: "md200",
                field5: "md35",
              },
              legend: { display: true },
              xyCursor: false,
              xAxes: { minGridDistance: 30, gridTemplateLocation: 0 },
              series: {
                strokeWidth: 2,
              },
            },
          },
          {
            id: "001001001448002",
            title: "فروش ماهانه", //inja be baad
            type: "Gauge",
            data: {
              score: 213,
              gradingData: {
                title: "total",
                color: "#ee1f25",
                lowScore: 0,
                highScore: 500,
              },
            },
            options:{
              label:{
                display: true,
                fontSize:45,
                text:"0"
              }
            }
          },
          {
            id: "001001001448003",
            title: "پراکندگی موتور",
            type: "Bubble",
            data: [
              {
                title: "پیستونی و ونکل",
                color: "#eea638",
                x: 65,
                y: 65,
                value: 15,
              },
              {
                title: "کنترل کیفیت",
                color: "#d8854f",
                x: 65,
                y: 15,
                value: 5,
              },
              {
                title: "برق و الکترونیک",
                color: "#de4c4f",
                x: 15,
                y: 65,
                value: 3,
              },
              {
                title: "انبار",
                color: "#de4c4f",
                x: 15,
                y: 15,
                value: 25,
              },
            ],
            options: {
              fieldNames: {
                field1: "md110",
                field2: "md550",
                field3: "md275",
                field4: "md200",
                field5: "md35",
              },
              legend: { display: true },
              xyCursor: false,
              xAxes: { minGridDistance: 30, gridTemplateLocation: 0 },
              series: {
                strokeWidth: 2,
              },
            },
          },
        ],
      },
      // {
      //   bankId: "001001001450",
      //   bankName: "آخرین وضعیت مراحل تولید",
      //   charts: [
      //     {
      //       id: "001001001450001",
      //       title: "سهم فروش",
      //       type: "Doughnut",
      //       backGroundColor: [
      //         "rgba(116, 103, 240, 1)",
      //         "rgba(255, 165, 80, 1)",
      //         "rgba(234, 96, 97, 1)",
      //         "rgba(0, 136, 132, 1)",
      //         "rgba(152, 148, 215, 1)",
      //         "#d7cb94",
      //       ],
      //       borderColor: [],
      //       borderWidth: 0,
      //       database: {
      //         labels: ["110", "55", "275", "200", "35", "پره"],
      //         data: [
      //           {
      //             label: "ُسهم فروش",
      //             data: [36, 41, 2, 19, 0, 2],
      //           },
      //         ],
      //       },
      //       options: {
      //         responsive: true,
      //         maintainAspectRatio: false,
      //         cutout: "65%",
      //         plugins: {
      //           legend: {
      //             labels: {
      //               usePointStyle: true,
      //             },
      //             display: true,
      //             rtl: false,
      //             position: "bottom",
      //           },
      //         },
      //         scales: {
      //           title: {
      //             display: false,
      //           },
      //           x: {
      //             ticks: { display: false },
      //             grid: {
      //               display: false,
      //               drawBorder: false,
      //             },
      //           },
      //           y: {
      //             ticks: { display: false },
      //             grid: {
      //               display: false,
      //               drawBorder: false,
      //             },
      //             // beginAtZero: true,
      //           },
      //         },
      //       },
      //     },
      //     {
      //       id: "001001001450002",
      //       title: "نمودار خطی فروش ماهانه",
      //       type: "Line",
      //       backGroundColor: [
      //         "rgba(116, 103, 240, 1)",
      //         "rgba(255, 165, 80, 1)",
      //         "rgba(234, 96, 97, 1)",
      //         "rgba(0, 136, 132, 1)",
      //         "rgba(152, 148, 215, 1)",
      //       ],
      //       borderColor: [
      //         "rgba(116, 103, 240, 1)",
      //         "rgba(255, 165, 80, 1)",
      //         "rgba(234, 96, 97, 1)",
      //         "rgba(0, 136, 132, 1)",
      //         "rgba(152, 148, 215, 1)",
      //       ],
      //       database: {
      //         labels: [
      //           "فروردین",
      //           "اردیبهشت",
      //           "خرداد",
      //           "تیر",
      //           "مرداد",
      //           // "شهریور",
      //           // "مهر",
      //           // "آبان",
      //           // "آذر",
      //           // "دی",
      //           // "بهمن",
      //           // "اسفند",
      //         ],
      //         data: [
      //           {
      //             label: "110",
      //             data: [32, 25, 15, 1],
      //           },
      //           {
      //             label: "550",
      //             data: [25, 15, 5, 5],
      //           },
      //           {
      //             label: "275",
      //             data: [2, 1, 1, 1],
      //           },
      //           {
      //             label: "200",
      //             data: [25, 15, 10, 10],
      //           },
      //           {
      //             label: "35",
      //             data: [10, 15, 15, 5],
      //           },
      //         ],
      //       },
      //       options: {
      //         tension: 0.2,
      //         responsive: true,
      //         maintainAspectRatio: false,
      //         plugins: {
      //           legend: {
      //             labels: {
      //               usePointStyle: true,
      //             },
      //             display: true,
      //             rtl: false,
      //             position: "top",
      //           },
      //         },
      //         scales: {
      //           y: {
      //             // position: "right",
      //             beginAtZero: false,
      //           },
      //         },
      //       },
      //     },
      //     {
      //       id: "001001001450003",
      //       title: "نمودار ستونی فروش ماهانه",
      //       type: "Bar",
      //       backGroundColor: [
      //         "rgba(116, 103, 240, 1)",
      //         "rgba(255, 165, 80, 1)",
      //         "rgba(234, 96, 97, 1)",
      //         "rgba(0, 136, 132, 1)",
      //         "rgba(152, 148, 215, 1)",
      //       ],
      //       borderColor: [],
      //       borderRadius: 3,
      //       borderWidth: 0,
      //       database: {
      //         labels: [
      //           "فروردین",
      //           "اردیبهشت",
      //           "خرداد",
      //           "تیر",
      //           "مرداد",
      //           // "شهریور",
      //           // "مهر",
      //           // "آبان",
      //           // "آذر",
      //           // "دی",
      //           // "بهمن",
      //           // "اسفند",
      //         ],
      //         data: [
      //           {
      //             label: "110",
      //             data: [32, 25, 15, 1],
      //           },
      //           {
      //             label: "550",
      //             data: [25, 15, 5, 5],
      //           },
      //           {
      //             label: "275",
      //             data: [2, 1, 1, 1],
      //           },
      //           {
      //             label: "200",
      //             data: [25, 15, 10, 10],
      //           },
      //           {
      //             label: "35",
      //             data: [10, 15, 15, 5],
      //           },
      //         ],
      //       },
      //       options: {
      //         responsive: true,
      //         maintainAspectRatio: false,
      //         scales: {
      //           y: {
      //             beginAtZero: true,
      //           },
      //         },
      //       },
      //     },
      //   ],
      // },
    ],
  },
  // {
  //   softwareId: "001001002",
  //   banks: [
  //     {
  //       bankId: "001001002229",
  //       bankName: "فاکتور فروش قطعی",
  //       charts: [
  //         {
  //           id: "001001002229001",
  //           title: "سهم فروش",
  //           type: "Doughnut",
  //           backGroundColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //             "#d7cb94",
  //           ],
  //           borderColor: [],
  //           borderWidth: 0,
  //           database: {
  //             labels: ["110", "55", "275", "200", "35", "پره"],
  //             data: [
  //               {
  //                 label: "ُسهم فروش",
  //                 data: [36, 41, 2, 19, 0, 2],
  //               },
  //             ],
  //           },
  //           options: {
  //             responsive: true,
  //             maintainAspectRatio: false,
  //             cutout: "65%",
  //             plugins: {
  //               legend: {
  //                 labels: {
  //                   usePointStyle: true,
  //                 },
  //                 display: true,
  //                 rtl: false,
  //                 position: "bottom",
  //               },
  //             },
  //             scales: {
  //               title: {
  //                 display: false,
  //               },
  //               x: {
  //                 ticks: { display: false },
  //                 grid: {
  //                   display: false,
  //                   drawBorder: false,
  //                 },
  //               },
  //               y: {
  //                 ticks: { display: false },
  //                 grid: {
  //                   display: false,
  //                   drawBorder: false,
  //                 },
  //                 // beginAtZero: true,
  //               },
  //             },
  //           },
  //         },
  //         {
  //           id: "001001002229002",
  //           title: "نمودار خطی فروش ماهانه",
  //           type: "Line",
  //           backGroundColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //           ],
  //           borderColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //           ],
  //           database: {
  //             labels: [
  //               "فروردین",
  //               "اردیبهشت",
  //               "خرداد",
  //               "تیر",
  //               "مرداد",
  //               // "شهریور",
  //               // "مهر",
  //               // "آبان",
  //               // "آذر",
  //               // "دی",
  //               // "بهمن",
  //               // "اسفند",
  //             ],
  //             data: [
  //               {
  //                 label: "110",
  //                 data: [32, 25, 15, 1],
  //               },
  //               {
  //                 label: "550",
  //                 data: [25, 15, 5, 5],
  //               },
  //               {
  //                 label: "275",
  //                 data: [2, 1, 1, 1],
  //               },
  //               {
  //                 label: "200",
  //                 data: [25, 15, 10, 10],
  //               },
  //               {
  //                 label: "35",
  //                 data: [10, 15, 15, 5],
  //               },
  //             ],
  //           },
  //           options: {
  //             tension: 0.2,
  //             responsive: true,
  //             maintainAspectRatio: false,
  //             plugins: {
  //               legend: {
  //                 labels: {
  //                   usePointStyle: true,
  //                 },
  //                 display: true,
  //                 rtl: false,
  //                 position: "top",
  //               },
  //             },
  //             scales: {
  //               y: {
  //                 // position: "right",
  //                 beginAtZero: false,
  //               },
  //             },
  //           },
  //         },
  //         {
  //           id: "001001002229003",
  //           title: "نمودار ستونی فروش ماهانه",
  //           type: "Bar",
  //           backGroundColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //           ],
  //           borderColor: [],
  //           borderRadius: 3,
  //           borderWidth: 0,
  //           database: {
  //             labels: [
  //               "فروردین",
  //               "اردیبهشت",
  //               "خرداد",
  //               "تیر",
  //               "مرداد",
  //               // "شهریور",
  //               // "مهر",
  //               // "آبان",
  //               // "آذر",
  //               // "دی",
  //               // "بهمن",
  //               // "اسفند",
  //             ],
  //             data: [
  //               {
  //                 label: "110",
  //                 data: [32, 25, 15, 1],
  //               },
  //               {
  //                 label: "550",
  //                 data: [25, 15, 5, 5],
  //               },
  //               {
  //                 label: "275",
  //                 data: [2, 1, 1, 1],
  //               },
  //               {
  //                 label: "200",
  //                 data: [25, 15, 10, 10],
  //               },
  //               {
  //                 label: "35",
  //                 data: [10, 15, 15, 5],
  //               },
  //             ],
  //           },
  //           options: {
  //             responsive: true,
  //             maintainAspectRatio: false,
  //             scales: {
  //               y: {
  //                 beginAtZero: true,
  //               },
  //             },
  //           },
  //         },
  //       ],
  //     },
  //     {
  //       bankId: "001001002228",
  //       bankName: "فاکتور خرید قطعی",
  //       charts: [
  //         {
  //           id: "001001002228001",
  //           title: "سهم فروش",
  //           type: "Doughnut",
  //           backGroundColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //             "#d7cb94",
  //           ],
  //           borderColor: [],
  //           borderWidth: 0,
  //           database: {
  //             labels: ["110", "55", "275", "200", "35", "پره"],
  //             data: [
  //               {
  //                 label: "ُسهم فروش",
  //                 data: [36, 41, 2, 19, 0, 2],
  //               },
  //             ],
  //           },
  //           options: {
  //             responsive: true,
  //             maintainAspectRatio: false,
  //             cutout: "65%",
  //             plugins: {
  //               legend: {
  //                 labels: {
  //                   usePointStyle: true,
  //                 },
  //                 display: true,
  //                 rtl: false,
  //                 position: "bottom",
  //               },
  //             },
  //             scales: {
  //               title: {
  //                 display: false,
  //               },
  //               x: {
  //                 ticks: { display: false },
  //                 grid: {
  //                   display: false,
  //                   drawBorder: false,
  //                 },
  //               },
  //               y: {
  //                 ticks: { display: false },
  //                 grid: {
  //                   display: false,
  //                   drawBorder: false,
  //                 },
  //                 // beginAtZero: true,
  //               },
  //             },
  //           },
  //         },
  //         {
  //           id: "001001002228002",
  //           title: "نمودار خطی فروش ماهانه",
  //           type: "Line",
  //           backGroundColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //           ],
  //           borderColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //           ],
  //           database: {
  //             labels: [
  //               "فروردین",
  //               "اردیبهشت",
  //               "خرداد",
  //               "تیر",
  //               "مرداد",
  //               // "شهریور",
  //               // "مهر",
  //               // "آبان",
  //               // "آذر",
  //               // "دی",
  //               // "بهمن",
  //               // "اسفند",
  //             ],
  //             data: [
  //               {
  //                 label: "110",
  //                 data: [32, 25, 15, 1],
  //               },
  //               {
  //                 label: "550",
  //                 data: [25, 15, 5, 5],
  //               },
  //               {
  //                 label: "275",
  //                 data: [2, 1, 1, 1],
  //               },
  //               {
  //                 label: "200",
  //                 data: [25, 15, 10, 10],
  //               },
  //               {
  //                 label: "35",
  //                 data: [10, 15, 15, 5],
  //               },
  //             ],
  //           },
  //           options: {
  //             tension: 0.2,

  //             responsive: true,
  //             maintainAspectRatio: false,
  //             plugins: {
  //               legend: {
  //                 labels: {
  //                   usePointStyle: true,
  //                 },
  //                 display: true,
  //                 rtl: false,
  //                 position: "top",
  //               },
  //             },
  //             scales: {
  //               y: {
  //                 // position: "right",
  //                 beginAtZero: false,
  //               },
  //             },
  //           },
  //         },
  //         {
  //           id: "001001002228003",
  //           title: "نمودار ستونی فروش ماهانه",
  //           type: "Bar",
  //           backGroundColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //           ],
  //           borderColor: [],
  //           borderRadius: 3,
  //           borderWidth: 0,
  //           database: {
  //             labels: [
  //               "فروردین",
  //               "اردیبهشت",
  //               "خرداد",
  //               "تیر",
  //               "مرداد",
  //               // "شهریور",
  //               // "مهر",
  //               // "آبان",
  //               // "آذر",
  //               // "دی",
  //               // "بهمن",
  //               // "اسفند",
  //             ],
  //             data: [
  //               {
  //                 label: "110",
  //                 data: [32, 25, 15, 1],
  //               },
  //               {
  //                 label: "550",
  //                 data: [25, 15, 5, 5],
  //               },
  //               {
  //                 label: "275",
  //                 data: [2, 1, 1, 1],
  //               },
  //               {
  //                 label: "200",
  //                 data: [25, 15, 10, 10],
  //               },
  //               {
  //                 label: "35",
  //                 data: [10, 15, 15, 5],
  //               },
  //             ],
  //           },
  //           options: {
  //             responsive: true,
  //             maintainAspectRatio: false,
  //             scales: {
  //               y: {
  //                 beginAtZero: true,
  //               },
  //             },
  //           },
  //         },
  //       ],
  //     },
  //     {
  //       bankId: "001001002262",
  //       bankName: "دفتر روزنامه",
  //       charts: [
  //         {
  //           id: "001001002262001",
  //           title: "سهم فروش",
  //           type: "Doughnut",
  //           backGroundColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //             "#d7cb94",
  //           ],
  //           borderColor: [],
  //           borderWidth: 0,
  //           database: {
  //             labels: ["110", "55", "275", "200", "35", "پره"],
  //             data: [
  //               {
  //                 label: "ُسهم فروش",
  //                 data: [36, 41, 2, 19, 0, 2],
  //               },
  //             ],
  //           },
  //           options: {
  //             responsive: true,
  //             maintainAspectRatio: false,
  //             cutout: "65%",
  //             plugins: {
  //               legend: {
  //                 labels: {
  //                   usePointStyle: true,
  //                 },
  //                 display: true,
  //                 rtl: false,
  //                 position: "bottom",
  //               },
  //             },
  //             scales: {
  //               title: {
  //                 display: false,
  //               },
  //               x: {
  //                 ticks: { display: false },
  //                 grid: {
  //                   display: false,
  //                   drawBorder: false,
  //                 },
  //               },
  //               y: {
  //                 ticks: { display: false },
  //                 grid: {
  //                   display: false,
  //                   drawBorder: false,
  //                 },
  //                 // beginAtZero: true,
  //               },
  //             },
  //           },
  //         },
  //         {
  //           id: "001001002262002",
  //           title: "نمودار خطی فروش ماهانه",
  //           type: "Line",
  //           backGroundColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //           ],
  //           borderColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //           ],
  //           database: {
  //             labels: [
  //               "فروردین",
  //               "اردیبهشت",
  //               "خرداد",
  //               "تیر",
  //               "مرداد",
  //               // "شهریور",
  //               // "مهر",
  //               // "آبان",
  //               // "آذر",
  //               // "دی",
  //               // "بهمن",
  //               // "اسفند",
  //             ],
  //             data: [
  //               {
  //                 label: "110",
  //                 data: [32, 25, 15, 1],
  //               },
  //               {
  //                 label: "550",
  //                 data: [25, 15, 5, 5],
  //               },
  //               {
  //                 label: "275",
  //                 data: [2, 1, 1, 1],
  //               },
  //               {
  //                 label: "200",
  //                 data: [25, 15, 10, 10],
  //               },
  //               {
  //                 label: "35",
  //                 data: [10, 15, 15, 5],
  //               },
  //             ],
  //           },
  //           options: {
  //             tension: 0.2,

  //             responsive: true,
  //             maintainAspectRatio: false,
  //             plugins: {
  //               legend: {
  //                 labels: {
  //                   usePointStyle: true,
  //                 },
  //                 display: true,
  //                 rtl: false,
  //                 position: "top",
  //               },
  //             },
  //             scales: {
  //               y: {
  //                 // position: "right",
  //                 beginAtZero: false,
  //               },
  //             },
  //           },
  //         },
  //         {
  //           id: "001001002262003",
  //           title: "نمودار ستونی فروش ماهانه",
  //           type: "Bar",
  //           backGroundColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //           ],
  //           borderColor: [],
  //           borderRadius: 3,
  //           borderWidth: 0,
  //           database: {
  //             labels: [
  //               "فروردین",
  //               "اردیبهشت",
  //               "خرداد",
  //               "تیر",
  //               "مرداد",
  //               // "شهریور",
  //               // "مهر",
  //               // "آبان",
  //               // "آذر",
  //               // "دی",
  //               // "بهمن",
  //               // "اسفند",
  //             ],
  //             data: [
  //               {
  //                 label: "110",
  //                 data: [32, 25, 15, 1],
  //               },
  //               {
  //                 label: "550",
  //                 data: [25, 15, 5, 5],
  //               },
  //               {
  //                 label: "275",
  //                 data: [2, 1, 1, 1],
  //               },
  //               {
  //                 label: "200",
  //                 data: [25, 15, 10, 10],
  //               },
  //               {
  //                 label: "35",
  //                 data: [10, 15, 15, 5],
  //               },
  //             ],
  //           },
  //           options: {
  //             responsive: true,
  //             maintainAspectRatio: false,
  //             scales: {
  //               y: {
  //                 beginAtZero: true,
  //               },
  //             },
  //           },
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   softwareId: "001001003",
  //   banks: [
  //     {
  //       bankId: "001001003162",
  //       bankName: "اطلاعات کالاها",
  //       charts: [
  //         {
  //           id: "001001003162001",
  //           title: "سهم فروش",
  //           type: "Doughnut",
  //           backGroundColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //             "#d7cb94",
  //           ],
  //           borderColor: [],
  //           borderWidth: 0,
  //           database: {
  //             labels: ["110", "55", "275", "200", "35", "پره"],
  //             data: [
  //               {
  //                 label: "ُسهم فروش",
  //                 data: [36, 41, 2, 19, 0, 2],
  //               },
  //             ],
  //           },
  //           options: {
  //             responsive: true,
  //             maintainAspectRatio: false,
  //             cutout: "65%",
  //             plugins: {
  //               legend: {
  //                 labels: {
  //                   usePointStyle: true,
  //                 },
  //                 display: true,
  //                 rtl: false,
  //                 position: "bottom",
  //               },
  //             },
  //             scales: {
  //               title: {
  //                 display: false,
  //               },
  //               x: {
  //                 ticks: { display: false },
  //                 grid: {
  //                   display: false,
  //                   drawBorder: false,
  //                 },
  //               },
  //               y: {
  //                 ticks: { display: false },
  //                 grid: {
  //                   display: false,
  //                   drawBorder: false,
  //                 },
  //                 // beginAtZero: true,
  //               },
  //             },
  //           },
  //         },
  //         {
  //           id: "001001003162002",
  //           title: "نمودار خطی فروش ماهانه",
  //           type: "Line",
  //           backGroundColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //           ],
  //           borderColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //           ],
  //           database: {
  //             labels: [
  //               "فروردین",
  //               "اردیبهشت",
  //               "خرداد",
  //               "تیر",
  //               "مرداد",
  //               // "شهریور",
  //               // "مهر",
  //               // "آبان",
  //               // "آذر",
  //               // "دی",
  //               // "بهمن",
  //               // "اسفند",
  //             ],
  //             data: [
  //               {
  //                 label: "110",
  //                 data: [32, 25, 15, 1],
  //               },
  //               {
  //                 label: "550",
  //                 data: [25, 15, 5, 5],
  //               },
  //               {
  //                 label: "275",
  //                 data: [2, 1, 1, 1],
  //               },
  //               {
  //                 label: "200",
  //                 data: [25, 15, 10, 10],
  //               },
  //               {
  //                 label: "35",
  //                 data: [10, 15, 15, 5],
  //               },
  //             ],
  //           },
  //           options: {
  //             tension: 0.2,
  //             responsive: true,
  //             maintainAspectRatio: false,
  //             plugins: {
  //               legend: {
  //                 labels: {
  //                   usePointStyle: true,
  //                 },
  //                 display: true,
  //                 rtl: false,
  //                 position: "top",
  //               },
  //             },
  //             scales: {
  //               y: {
  //                 // position: "right",
  //                 beginAtZero: false,
  //               },
  //             },
  //           },
  //         },
  //         {
  //           id: "001001003162003",
  //           title: "نمودار ستونی فروش ماهانه",
  //           type: "Bar",
  //           backGroundColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //           ],
  //           borderColor: [],
  //           borderRadius: 3,
  //           borderWidth: 0,
  //           database: {
  //             labels: [
  //               "فروردین",
  //               "اردیبهشت",
  //               "خرداد",
  //               "تیر",
  //               "مرداد",
  //               // "شهریور",
  //               // "مهر",
  //               // "آبان",
  //               // "آذر",
  //               // "دی",
  //               // "بهمن",
  //               // "اسفند",
  //             ],
  //             data: [
  //               {
  //                 label: "110",
  //                 data: [32, 25, 15, 1],
  //               },
  //               {
  //                 label: "550",
  //                 data: [25, 15, 5, 5],
  //               },
  //               {
  //                 label: "275",
  //                 data: [2, 1, 1, 1],
  //               },
  //               {
  //                 label: "200",
  //                 data: [25, 15, 10, 10],
  //               },
  //               {
  //                 label: "35",
  //                 data: [10, 15, 15, 5],
  //               },
  //             ],
  //           },
  //           options: {
  //             responsive: true,
  //             maintainAspectRatio: false,
  //             scales: {
  //               y: {
  //                 beginAtZero: true,
  //               },
  //             },
  //           },
  //         },
  //       ],
  //     },
  //     {
  //       bankId: "001001003165",
  //       bankName: "حواله انبار قطعی",
  //       charts: [
  //         {
  //           id: "001001003165001",
  //           title: "سهم فروش",
  //           type: "Doughnut",
  //           backGroundColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //             "#d7cb94",
  //           ],
  //           borderColor: [],
  //           borderWidth: 0,
  //           database: {
  //             labels: ["110", "55", "275", "200", "35", "پره"],
  //             data: [
  //               {
  //                 label: "ُسهم فروش",
  //                 data: [36, 41, 2, 19, 0, 2],
  //               },
  //             ],
  //           },
  //           options: {
  //             responsive: true,
  //             maintainAspectRatio: false,
  //             cutout: "65%",
  //             plugins: {
  //               legend: {
  //                 labels: {
  //                   usePointStyle: true,
  //                 },
  //                 display: true,
  //                 rtl: false,
  //                 position: "bottom",
  //               },
  //             },
  //             scales: {
  //               title: {
  //                 display: false,
  //               },
  //               x: {
  //                 ticks: { display: false },
  //                 grid: {
  //                   display: false,
  //                   drawBorder: false,
  //                 },
  //               },
  //               y: {
  //                 ticks: { display: false },
  //                 grid: {
  //                   display: false,
  //                   drawBorder: false,
  //                 },
  //                 // beginAtZero: true,
  //               },
  //             },
  //           },
  //         },
  //         {
  //           id: "001001003165002",
  //           title: "نمودار خطی فروش ماهانه",
  //           type: "Line",
  //           backGroundColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //           ],
  //           borderColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //           ],
  //           database: {
  //             labels: [
  //               "فروردین",
  //               "اردیبهشت",
  //               "خرداد",
  //               "تیر",
  //               "مرداد",
  //               // "شهریور",
  //               // "مهر",
  //               // "آبان",
  //               // "آذر",
  //               // "دی",
  //               // "بهمن",
  //               // "اسفند",
  //             ],
  //             data: [
  //               {
  //                 label: "110",
  //                 data: [32, 25, 15, 1],
  //               },
  //               {
  //                 label: "550",
  //                 data: [25, 15, 5, 5],
  //               },
  //               {
  //                 label: "275",
  //                 data: [2, 1, 1, 1],
  //               },
  //               {
  //                 label: "200",
  //                 data: [25, 15, 10, 10],
  //               },
  //               {
  //                 label: "35",
  //                 data: [10, 15, 15, 5],
  //               },
  //             ],
  //           },
  //           options: {
  //             tension: 0.2,
  //             responsive: true,
  //             maintainAspectRatio: false,
  //             plugins: {
  //               legend: {
  //                 labels: {
  //                   usePointStyle: true,
  //                 },
  //                 display: true,
  //                 rtl: false,
  //                 position: "top",
  //               },
  //             },
  //             scales: {
  //               y: {
  //                 // position: "right",
  //                 beginAtZero: false,
  //               },
  //             },
  //           },
  //         },
  //         {
  //           id: "001001003165003",
  //           title: "نمودار ستونی فروش ماهانه",
  //           type: "Bar",
  //           backGroundColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //           ],
  //           borderColor: [],
  //           borderRadius: 3,
  //           borderWidth: 0,
  //           database: {
  //             labels: [
  //               "فروردین",
  //               "اردیبهشت",
  //               "خرداد",
  //               "تیر",
  //               "مرداد",
  //               // "شهریور",
  //               // "مهر",
  //               // "آبان",
  //               // "آذر",
  //               // "دی",
  //               // "بهمن",
  //               // "اسفند",
  //             ],
  //             data: [
  //               {
  //                 label: "110",
  //                 data: [32, 25, 15, 1],
  //               },
  //               {
  //                 label: "550",
  //                 data: [25, 15, 5, 5],
  //               },
  //               {
  //                 label: "275",
  //                 data: [2, 1, 1, 1],
  //               },
  //               {
  //                 label: "200",
  //                 data: [25, 15, 10, 10],
  //               },
  //               {
  //                 label: "35",
  //                 data: [10, 15, 15, 5],
  //               },
  //             ],
  //           },
  //           options: {
  //             responsive: true,
  //             maintainAspectRatio: false,
  //             scales: {
  //               y: {
  //                 beginAtZero: true,
  //               },
  //             },
  //           },
  //         },
  //       ],
  //     },
  //     {
  //       bankId: "001001003179",
  //       bankName: "رسید برگشتی قطعی",
  //       charts: [
  //         {
  //           id: "001001003179001",
  //           title: "سهم فروش",
  //           type: "Doughnut",
  //           backGroundColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //             "#d7cb94",
  //           ],
  //           borderColor: [],
  //           borderWidth: 0,
  //           database: {
  //             labels: ["110", "55", "275", "200", "35", "پره"],
  //             data: [
  //               {
  //                 label: "ُسهم فروش",
  //                 data: [36, 41, 2, 19, 0, 2],
  //               },
  //             ],
  //           },
  //           options: {
  //             responsive: true,
  //             maintainAspectRatio: false,
  //             cutout: "65%",
  //             plugins: {
  //               legend: {
  //                 labels: {
  //                   usePointStyle: true,
  //                 },
  //                 display: true,
  //                 rtl: false,
  //                 position: "bottom",
  //               },
  //             },
  //             scales: {
  //               title: {
  //                 display: false,
  //               },
  //               x: {
  //                 ticks: { display: false },
  //                 grid: {
  //                   display: false,
  //                   drawBorder: false,
  //                 },
  //               },
  //               y: {
  //                 ticks: { display: false },
  //                 grid: {
  //                   display: false,
  //                   drawBorder: false,
  //                 },
  //                 // beginAtZero: true,
  //               },
  //             },
  //           },
  //         },
  //         {
  //           id: "001001003179002",
  //           title: "نمودار خطی فروش ماهانه",
  //           type: "Line",
  //           backGroundColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //           ],
  //           borderColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //           ],
  //           database: {
  //             labels: [
  //               "فروردین",
  //               "اردیبهشت",
  //               "خرداد",
  //               "تیر",
  //               "مرداد",
  //               // "شهریور",
  //               // "مهر",
  //               // "آبان",
  //               // "آذر",
  //               // "دی",
  //               // "بهمن",
  //               // "اسفند",
  //             ],
  //             data: [
  //               {
  //                 label: "110",
  //                 data: [32, 25, 15, 1],
  //               },
  //               {
  //                 label: "550",
  //                 data: [25, 15, 5, 5],
  //               },
  //               {
  //                 label: "275",
  //                 data: [2, 1, 1, 1],
  //               },
  //               {
  //                 label: "200",
  //                 data: [25, 15, 10, 10],
  //               },
  //               {
  //                 label: "35",
  //                 data: [10, 15, 15, 5],
  //               },
  //             ],
  //           },
  //           options: {
  //             tension: 0.2,
  //             responsive: true,
  //             maintainAspectRatio: false,
  //             plugins: {
  //               legend: {
  //                 labels: {
  //                   usePointStyle: true,
  //                 },
  //                 display: true,
  //                 rtl: false,
  //                 position: "top",
  //               },
  //             },
  //             scales: {
  //               y: {
  //                 // position: "right",
  //                 beginAtZero: false,
  //               },
  //             },
  //           },
  //         },
  //         {
  //           id: "001001003179003",
  //           title: "نمودار ستونی فروش ماهانه",
  //           type: "Bar",
  //           backGroundColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //           ],
  //           borderColor: [],
  //           borderRadius: 3,
  //           borderWidth: 0,
  //           database: {
  //             labels: [
  //               "فروردین",
  //               "اردیبهشت",
  //               "خرداد",
  //               "تیر",
  //               "مرداد",
  //               // "شهریور",
  //               // "مهر",
  //               // "آبان",
  //               // "آذر",
  //               // "دی",
  //               // "بهمن",
  //               // "اسفند",
  //             ],
  //             data: [
  //               {
  //                 label: "110",
  //                 data: [32, 25, 15, 1],
  //               },
  //               {
  //                 label: "550",
  //                 data: [25, 15, 5, 5],
  //               },
  //               {
  //                 label: "275",
  //                 data: [2, 1, 1, 1],
  //               },
  //               {
  //                 label: "200",
  //                 data: [25, 15, 10, 10],
  //               },
  //               {
  //                 label: "35",
  //                 data: [10, 15, 15, 5],
  //               },
  //             ],
  //           },
  //           options: {
  //             responsive: true,
  //             maintainAspectRatio: false,
  //             scales: {
  //               y: {
  //                 beginAtZero: true,
  //               },
  //             },
  //           },
  //         },
  //       ],
  //     },
  //     {
  //       bankId: "001001003199",
  //       bankName: "کاردکس کل",
  //       charts: [
  //         {
  //           id: "001001003199001",
  //           title: "سهم فروش",
  //           type: "Doughnut",
  //           backGroundColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //             "#d7cb94",
  //           ],
  //           borderColor: [],
  //           borderWidth: 0,
  //           database: {
  //             labels: ["110", "55", "275", "200", "35", "پره"],
  //             data: [
  //               {
  //                 label: "ُسهم فروش",
  //                 data: [36, 41, 2, 19, 0, 2],
  //               },
  //             ],
  //           },
  //           options: {
  //             responsive: true,
  //             maintainAspectRatio: false,
  //             cutout: "65%",
  //             plugins: {
  //               legend: {
  //                 labels: {
  //                   usePointStyle: true,
  //                 },
  //                 display: true,
  //                 rtl: false,
  //                 position: "bottom",
  //               },
  //             },
  //             scales: {
  //               title: {
  //                 display: false,
  //               },
  //               x: {
  //                 ticks: { display: false },
  //                 grid: {
  //                   display: false,
  //                   drawBorder: false,
  //                 },
  //               },
  //               y: {
  //                 ticks: { display: false },
  //                 grid: {
  //                   display: false,
  //                   drawBorder: false,
  //                 },
  //                 // beginAtZero: true,
  //               },
  //             },
  //           },
  //         },
  //         {
  //           id: "001001003199002",
  //           title: "نمودار خطی فروش ماهانه",
  //           type: "Line",
  //           backGroundColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //           ],
  //           borderColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //           ],
  //           database: {
  //             labels: [
  //               "فروردین",
  //               "اردیبهشت",
  //               "خرداد",
  //               "تیر",
  //               "مرداد",
  //               // "شهریور",
  //               // "مهر",
  //               // "آبان",
  //               // "آذر",
  //               // "دی",
  //               // "بهمن",
  //               // "اسفند",
  //             ],
  //             data: [
  //               {
  //                 label: "110",
  //                 data: [32, 25, 15, 1],
  //               },
  //               {
  //                 label: "550",
  //                 data: [25, 15, 5, 5],
  //               },
  //               {
  //                 label: "275",
  //                 data: [2, 1, 1, 1],
  //               },
  //               {
  //                 label: "200",
  //                 data: [25, 15, 10, 10],
  //               },
  //               {
  //                 label: "35",
  //                 data: [10, 15, 15, 5],
  //               },
  //             ],
  //           },
  //           options: {
  //             tension: 0.2,
  //             responsive: true,
  //             maintainAspectRatio: false,
  //             plugins: {
  //               legend: {
  //                 labels: {
  //                   usePointStyle: true,
  //                 },
  //                 display: true,
  //                 rtl: false,
  //                 position: "top",
  //               },
  //             },
  //             scales: {
  //               y: {
  //                 // position: "right",
  //                 beginAtZero: false,
  //               },
  //             },
  //           },
  //         },
  //         {
  //           id: "001001003199003",
  //           title: "نمودار ستونی فروش ماهانه",
  //           type: "Bar",
  //           backGroundColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //           ],
  //           borderColor: [],
  //           borderRadius: 3,
  //           borderWidth: 0,
  //           database: {
  //             labels: [
  //               "فروردین",
  //               "اردیبهشت",
  //               "خرداد",
  //               "تیر",
  //               "مرداد",
  //               // "شهریور",
  //               // "مهر",
  //               // "آبان",
  //               // "آذر",
  //               // "دی",
  //               // "بهمن",
  //               // "اسفند",
  //             ],
  //             data: [
  //               {
  //                 label: "110",
  //                 data: [32, 25, 15, 1],
  //               },
  //               {
  //                 label: "550",
  //                 data: [25, 15, 5, 5],
  //               },
  //               {
  //                 label: "275",
  //                 data: [2, 1, 1, 1],
  //               },
  //               {
  //                 label: "200",
  //                 data: [25, 15, 10, 10],
  //               },
  //               {
  //                 label: "35",
  //                 data: [10, 15, 15, 5],
  //               },
  //             ],
  //           },
  //           options: {
  //             responsive: true,
  //             maintainAspectRatio: false,
  //             scales: {
  //               y: {
  //                 beginAtZero: true,
  //               },
  //             },
  //           },
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   softwareId: "001001004",
  //   banks: [
  //     {
  //       bankId: "001001004143",
  //       bankName: "سند حسابداری",
  //       charts: [
  //         {
  //           id: "001001004143001",
  //           title: "سهم فروش",
  //           type: "Doughnut",
  //           backGroundColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //             "#d7cb94",
  //           ],
  //           borderColor: [],
  //           borderWidth: 0,
  //           database: {
  //             labels: ["110", "55", "275", "200", "35", "پره"],
  //             data: [
  //               {
  //                 label: "ُسهم فروش",
  //                 data: [36, 41, 2, 19, 0, 2],
  //               },
  //             ],
  //           },
  //           options: {
  //             responsive: true,
  //             maintainAspectRatio: false,
  //             cutout: "65%",
  //             plugins: {
  //               legend: {
  //                 labels: {
  //                   usePointStyle: true,
  //                 },
  //                 display: true,
  //                 rtl: false,
  //                 position: "bottom",
  //               },
  //             },
  //             scales: {
  //               title: {
  //                 display: false,
  //               },
  //               x: {
  //                 ticks: { display: false },
  //                 grid: {
  //                   display: false,
  //                   drawBorder: false,
  //                 },
  //               },
  //               y: {
  //                 ticks: { display: false },
  //                 grid: {
  //                   display: false,
  //                   drawBorder: false,
  //                 },
  //                 // beginAtZero: true,
  //               },
  //             },
  //           },
  //         },
  //         {
  //           id: "001001004143002",
  //           title: "نمودار خطی فروش ماهانه",
  //           type: "Line",
  //           backGroundColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //           ],
  //           borderColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //           ],
  //           database: {
  //             labels: [
  //               "فروردین",
  //               "اردیبهشت",
  //               "خرداد",
  //               "تیر",
  //               "مرداد",
  //               // "شهریور",
  //               // "مهر",
  //               // "آبان",
  //               // "آذر",
  //               // "دی",
  //               // "بهمن",
  //               // "اسفند",
  //             ],
  //             data: [
  //               {
  //                 label: "110",
  //                 data: [32, 25, 15, 1],
  //               },
  //               {
  //                 label: "550",
  //                 data: [25, 15, 5, 5],
  //               },
  //               {
  //                 label: "275",
  //                 data: [2, 1, 1, 1],
  //               },
  //               {
  //                 label: "200",
  //                 data: [25, 15, 10, 10],
  //               },
  //               {
  //                 label: "35",
  //                 data: [10, 15, 15, 5],
  //               },
  //             ],
  //           },
  //           options: {
  //             tension: 0.2,
  //             responsive: true,
  //             maintainAspectRatio: false,
  //             plugins: {
  //               legend: {
  //                 labels: {
  //                   usePointStyle: true,
  //                 },
  //                 display: true,
  //                 rtl: false,
  //                 position: "top",
  //               },
  //             },
  //             scales: {
  //               y: {
  //                 // position: "right",
  //                 beginAtZero: false,
  //               },
  //             },
  //           },
  //         },
  //         {
  //           id: "001001004143003",
  //           title: "نمودار ستونی فروش ماهانه",
  //           type: "Bar",
  //           backGroundColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //           ],
  //           borderColor: [],
  //           borderRadius: 3,
  //           borderWidth: 0,
  //           database: {
  //             labels: [
  //               "فروردین",
  //               "اردیبهشت",
  //               "خرداد",
  //               "تیر",
  //               "مرداد",
  //               // "شهریور",
  //               // "مهر",
  //               // "آبان",
  //               // "آذر",
  //               // "دی",
  //               // "بهمن",
  //               // "اسفند",
  //             ],
  //             data: [
  //               {
  //                 label: "110",
  //                 data: [32, 25, 15, 1],
  //               },
  //               {
  //                 label: "550",
  //                 data: [25, 15, 5, 5],
  //               },
  //               {
  //                 label: "275",
  //                 data: [2, 1, 1, 1],
  //               },
  //               {
  //                 label: "200",
  //                 data: [25, 15, 10, 10],
  //               },
  //               {
  //                 label: "35",
  //                 data: [10, 15, 15, 5],
  //               },
  //             ],
  //           },
  //           options: {
  //             responsive: true,
  //             maintainAspectRatio: false,
  //             scales: {
  //               y: {
  //                 beginAtZero: true,
  //               },
  //             },
  //           },
  //         },
  //       ],
  //     },
  //     {
  //       bankId: "001001004303",
  //       bankName: "فاکتور خرید قطعی",
  //       charts: [
  //         {
  //           id: "001001004303001",
  //           title: "سهم فروش",
  //           type: "Doughnut",
  //           backGroundColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //             "#d7cb94",
  //           ],
  //           borderColor: [],
  //           borderWidth: 0,
  //           database: {
  //             labels: ["110", "55", "275", "200", "35", "پره"],
  //             data: [
  //               {
  //                 label: "ُسهم فروش",
  //                 data: [36, 41, 2, 19, 0, 2],
  //               },
  //             ],
  //           },
  //           options: {
  //             responsive: true,
  //             maintainAspectRatio: false,
  //             cutout: "65%",
  //             plugins: {
  //               legend: {
  //                 labels: {
  //                   usePointStyle: true,
  //                 },
  //                 display: true,
  //                 rtl: false,
  //                 position: "bottom",
  //               },
  //             },
  //             scales: {
  //               title: {
  //                 display: false,
  //               },
  //               x: {
  //                 ticks: { display: false },
  //                 grid: {
  //                   display: false,
  //                   drawBorder: false,
  //                 },
  //               },
  //               y: {
  //                 ticks: { display: false },
  //                 grid: {
  //                   display: false,
  //                   drawBorder: false,
  //                 },
  //                 // beginAtZero: true,
  //               },
  //             },
  //           },
  //         },
  //         {
  //           id: "001001004303002",
  //           title: "نمودار خطی فروش ماهانه",
  //           type: "Line",
  //           backGroundColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //           ],
  //           borderColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //           ],
  //           database: {
  //             labels: [
  //               "فروردین",
  //               "اردیبهشت",
  //               "خرداد",
  //               "تیر",
  //               "مرداد",
  //               // "شهریور",
  //               // "مهر",
  //               // "آبان",
  //               // "آذر",
  //               // "دی",
  //               // "بهمن",
  //               // "اسفند",
  //             ],
  //             data: [
  //               {
  //                 label: "110",
  //                 data: [32, 25, 15, 1],
  //               },
  //               {
  //                 label: "550",
  //                 data: [25, 15, 5, 5],
  //               },
  //               {
  //                 label: "275",
  //                 data: [2, 1, 1, 1],
  //               },
  //               {
  //                 label: "200",
  //                 data: [25, 15, 10, 10],
  //               },
  //               {
  //                 label: "35",
  //                 data: [10, 15, 15, 5],
  //               },
  //             ],
  //           },
  //           options: {
  //             tension: 0.2,
  //             responsive: true,
  //             maintainAspectRatio: false,
  //             plugins: {
  //               legend: {
  //                 labels: {
  //                   usePointStyle: true,
  //                 },
  //                 display: true,
  //                 rtl: false,
  //                 position: "top",
  //               },
  //             },
  //             scales: {
  //               y: {
  //                 // position: "right",
  //                 beginAtZero: false,
  //               },
  //             },
  //           },
  //         },
  //         {
  //           id: "001001004303003",
  //           title: "نمودار ستونی فروش ماهانه",
  //           type: "Bar",
  //           backGroundColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //           ],
  //           borderColor: [],
  //           borderRadius: 3,
  //           borderWidth: 0,
  //           database: {
  //             labels: [
  //               "فروردین",
  //               "اردیبهشت",
  //               "خرداد",
  //               "تیر",
  //               "مرداد",
  //               // "شهریور",
  //               // "مهر",
  //               // "آبان",
  //               // "آذر",
  //               // "دی",
  //               // "بهمن",
  //               // "اسفند",
  //             ],
  //             data: [
  //               {
  //                 label: "110",
  //                 data: [32, 25, 15, 1],
  //               },
  //               {
  //                 label: "550",
  //                 data: [25, 15, 5, 5],
  //               },
  //               {
  //                 label: "275",
  //                 data: [2, 1, 1, 1],
  //               },
  //               {
  //                 label: "200",
  //                 data: [25, 15, 10, 10],
  //               },
  //               {
  //                 label: "35",
  //                 data: [10, 15, 15, 5],
  //               },
  //             ],
  //           },
  //           options: {
  //             responsive: true,
  //             maintainAspectRatio: false,
  //             scales: {
  //               y: {
  //                 beginAtZero: true,
  //               },
  //             },
  //           },
  //         },
  //       ],
  //     },
  //     {
  //       bankId: "001001004302",
  //       bankName: "برگ رسید صندوق",
  //       charts: [
  //         {
  //           id: "001001004302001",
  //           title: "سهم فروش",
  //           type: "Doughnut",
  //           backGroundColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //             "#d7cb94",
  //           ],
  //           borderColor: [],
  //           borderWidth: 0,
  //           database: {
  //             labels: ["110", "55", "275", "200", "35", "پره"],
  //             data: [
  //               {
  //                 label: "ُسهم فروش",
  //                 data: [36, 41, 2, 19, 0, 2],
  //               },
  //             ],
  //           },
  //           options: {
  //             responsive: true,
  //             maintainAspectRatio: false,
  //             cutout: "65%",
  //             plugins: {
  //               legend: {
  //                 labels: {
  //                   usePointStyle: true,
  //                 },
  //                 display: true,
  //                 rtl: false,
  //                 position: "bottom",
  //               },
  //             },
  //             scales: {
  //               title: {
  //                 display: false,
  //               },
  //               x: {
  //                 ticks: { display: false },
  //                 grid: {
  //                   display: false,
  //                   drawBorder: false,
  //                 },
  //               },
  //               y: {
  //                 ticks: { display: false },
  //                 grid: {
  //                   display: false,
  //                   drawBorder: false,
  //                 },
  //                 // beginAtZero: true,
  //               },
  //             },
  //           },
  //         },
  //         {
  //           id: "001001004302002",
  //           title: "نمودار خطی فروش ماهانه",
  //           type: "Line",
  //           backGroundColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //           ],
  //           borderColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //           ],
  //           database: {
  //             labels: [
  //               "فروردین",
  //               "اردیبهشت",
  //               "خرداد",
  //               "تیر",
  //               "مرداد",
  //               // "شهریور",
  //               // "مهر",
  //               // "آبان",
  //               // "آذر",
  //               // "دی",
  //               // "بهمن",
  //               // "اسفند",
  //             ],
  //             data: [
  //               {
  //                 label: "110",
  //                 data: [32, 25, 15, 1],
  //               },
  //               {
  //                 label: "550",
  //                 data: [25, 15, 5, 5],
  //               },
  //               {
  //                 label: "275",
  //                 data: [2, 1, 1, 1],
  //               },
  //               {
  //                 label: "200",
  //                 data: [25, 15, 10, 10],
  //               },
  //               {
  //                 label: "35",
  //                 data: [10, 15, 15, 5],
  //               },
  //             ],
  //           },
  //           options: {
  //             tension: 0.2,
  //             responsive: true,
  //             maintainAspectRatio: false,
  //             plugins: {
  //               legend: {
  //                 labels: {
  //                   usePointStyle: true,
  //                 },
  //                 display: true,
  //                 rtl: false,
  //                 position: "top",
  //               },
  //             },
  //             scales: {
  //               y: {
  //                 // position: "right",
  //                 beginAtZero: false,
  //               },
  //             },
  //           },
  //         },
  //         {
  //           id: "001001004302003",
  //           title: "نمودار ستونی فروش ماهانه",
  //           type: "Bar",
  //           backGroundColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //           ],
  //           borderColor: [],
  //           borderRadius: 3,
  //           borderWidth: 0,
  //           database: {
  //             labels: [
  //               "فروردین",
  //               "اردیبهشت",
  //               "خرداد",
  //               "تیر",
  //               "مرداد",
  //               // "شهریور",
  //               // "مهر",
  //               // "آبان",
  //               // "آذر",
  //               // "دی",
  //               // "بهمن",
  //               // "اسفند",
  //             ],
  //             data: [
  //               {
  //                 label: "110",
  //                 data: [32, 25, 15, 1],
  //               },
  //               {
  //                 label: "550",
  //                 data: [25, 15, 5, 5],
  //               },
  //               {
  //                 label: "275",
  //                 data: [2, 1, 1, 1],
  //               },
  //               {
  //                 label: "200",
  //                 data: [25, 15, 10, 10],
  //               },
  //               {
  //                 label: "35",
  //                 data: [10, 15, 15, 5],
  //               },
  //             ],
  //           },
  //           options: {
  //             responsive: true,
  //             maintainAspectRatio: false,
  //             scales: {
  //               y: {
  //                 beginAtZero: true,
  //               },
  //             },
  //           },
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   softwareId: "001002001",
  //   banks: [
  //     {
  //       bankId: "001002001333",
  //       bankName: "رهگیری ساخت و تولید",
  //       charts: [
  //         {
  //           id: "001002001333001",
  //           title: "سهم فروش",
  //           type: "Doughnut",
  //           backGroundColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //             "#d7cb94",
  //           ],
  //           borderColor: [],
  //           borderWidth: 0,
  //           database: {
  //             labels: ["110", "55", "275", "200", "35", "پره"],
  //             data: [
  //               {
  //                 label: "ُسهم فروش",
  //                 data: [36, 41, 2, 19, 0, 2],
  //               },
  //             ],
  //           },
  //           options: {
  //             responsive: true,
  //             maintainAspectRatio: false,
  //             cutout: "65%",
  //             plugins: {
  //               legend: {
  //                 labels: {
  //                   usePointStyle: true,
  //                 },
  //                 display: true,
  //                 rtl: false,
  //                 position: "bottom",
  //               },
  //             },
  //             scales: {
  //               title: {
  //                 display: false,
  //               },
  //               x: {
  //                 ticks: { display: false },
  //                 grid: {
  //                   display: false,
  //                   drawBorder: false,
  //                 },
  //               },
  //               y: {
  //                 ticks: { display: false },
  //                 grid: {
  //                   display: false,
  //                   drawBorder: false,
  //                 },
  //                 // beginAtZero: true,
  //               },
  //             },
  //           },
  //         },
  //         {
  //           id: "001002001333002",
  //           title: "نمودار خطی فروش ماهانه",
  //           type: "Line",
  //           backGroundColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //           ],
  //           borderColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //           ],
  //           database: {
  //             labels: [
  //               "فروردین",
  //               "اردیبهشت",
  //               "خرداد",
  //               "تیر",
  //               "مرداد",
  //               // "شهریور",
  //               // "مهر",
  //               // "آبان",
  //               // "آذر",
  //               // "دی",
  //               // "بهمن",
  //               // "اسفند",
  //             ],
  //             data: [
  //               {
  //                 label: "110",
  //                 data: [32, 25, 15, 1],
  //               },
  //               {
  //                 label: "550",
  //                 data: [25, 15, 5, 5],
  //               },
  //               {
  //                 label: "275",
  //                 data: [2, 1, 1, 1],
  //               },
  //               {
  //                 label: "200",
  //                 data: [25, 15, 10, 10],
  //               },
  //               {
  //                 label: "35",
  //                 data: [10, 15, 15, 5],
  //               },
  //             ],
  //           },
  //           options: {
  //             tension: 0.2,
  //             responsive: true,
  //             maintainAspectRatio: false,
  //             plugins: {
  //               legend: {
  //                 labels: {
  //                   usePointStyle: true,
  //                 },
  //                 display: true,
  //                 rtl: false,
  //                 position: "top",
  //               },
  //             },
  //             scales: {
  //               y: {
  //                 // position: "right",
  //                 beginAtZero: false,
  //               },
  //             },
  //           },
  //         },
  //         {
  //           id: "001002001333003",
  //           title: "نمودار ستونی فروش ماهانه",
  //           type: "Bar",
  //           backGroundColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //           ],
  //           borderColor: [],
  //           borderRadius: 3,
  //           borderWidth: 0,
  //           database: {
  //             labels: [
  //               "فروردین",
  //               "اردیبهشت",
  //               "خرداد",
  //               "تیر",
  //               "مرداد",
  //               // "شهریور",
  //               // "مهر",
  //               // "آبان",
  //               // "آذر",
  //               // "دی",
  //               // "بهمن",
  //               // "اسفند",
  //             ],
  //             data: [
  //               {
  //                 label: "110",
  //                 data: [32, 25, 15, 1],
  //               },
  //               {
  //                 label: "550",
  //                 data: [25, 15, 5, 5],
  //               },
  //               {
  //                 label: "275",
  //                 data: [2, 1, 1, 1],
  //               },
  //               {
  //                 label: "200",
  //                 data: [25, 15, 10, 10],
  //               },
  //               {
  //                 label: "35",
  //                 data: [10, 15, 15, 5],
  //               },
  //             ],
  //           },
  //           options: {
  //             responsive: true,
  //             maintainAspectRatio: false,
  //             scales: {
  //               y: {
  //                 beginAtZero: true,
  //               },
  //             },
  //           },
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   softwareId: "001002002",
  //   banks: [
  //     {
  //       bankId: "001002002262",
  //       bankName: "دفترروزنامه",
  //       charts: [
  //         {
  //           id: "001002002262001",
  //           title: "سهم فروش",
  //           type: "Doughnut",
  //           backGroundColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //             "#d7cb94",
  //           ],
  //           borderColor: [],
  //           borderWidth: 0,
  //           database: {
  //             labels: ["110", "55", "275", "200", "35", "پره"],
  //             data: [
  //               {
  //                 label: "ُسهم فروش",
  //                 data: [36, 41, 2, 19, 0, 2],
  //               },
  //             ],
  //           },
  //           options: {
  //             responsive: true,
  //             maintainAspectRatio: false,
  //             cutout: "65%",
  //             plugins: {
  //               legend: {
  //                 labels: {
  //                   usePointStyle: true,
  //                 },
  //                 display: true,
  //                 rtl: false,
  //                 position: "bottom",
  //               },
  //             },
  //             scales: {
  //               title: {
  //                 display: false,
  //               },
  //               x: {
  //                 ticks: { display: false },
  //                 grid: {
  //                   display: false,
  //                   drawBorder: false,
  //                 },
  //               },
  //               y: {
  //                 ticks: { display: false },
  //                 grid: {
  //                   display: false,
  //                   drawBorder: false,
  //                 },
  //                 // beginAtZero: true,
  //               },
  //             },
  //           },
  //         },
  //         {
  //           id: "001002002262002",
  //           title: "نمودار خطی فروش ماهانه",
  //           type: "Line",
  //           backGroundColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //           ],
  //           borderColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //           ],
  //           database: {
  //             labels: [
  //               "فروردین",
  //               "اردیبهشت",
  //               "خرداد",
  //               "تیر",
  //               "مرداد",
  //               // "شهریور",
  //               // "مهر",
  //               // "آبان",
  //               // "آذر",
  //               // "دی",
  //               // "بهمن",
  //               // "اسفند",
  //             ],
  //             data: [
  //               {
  //                 label: "110",
  //                 data: [32, 25, 15, 1],
  //               },
  //               {
  //                 label: "550",
  //                 data: [25, 15, 5, 5],
  //               },
  //               {
  //                 label: "275",
  //                 data: [2, 1, 1, 1],
  //               },
  //               {
  //                 label: "200",
  //                 data: [25, 15, 10, 10],
  //               },
  //               {
  //                 label: "35",
  //                 data: [10, 15, 15, 5],
  //               },
  //             ],
  //           },
  //           options: {
  //             tension: 0.2,
  //             responsive: true,
  //             maintainAspectRatio: false,
  //             plugins: {
  //               legend: {
  //                 labels: {
  //                   usePointStyle: true,
  //                 },
  //                 display: true,
  //                 rtl: false,
  //                 position: "top",
  //               },
  //             },
  //             scales: {
  //               y: {
  //                 // position: "right",
  //                 beginAtZero: false,
  //               },
  //             },
  //           },
  //         },
  //         {
  //           id: "001002002262003",
  //           title: "نمودار ستونی فروش ماهانه",
  //           type: "Bar",
  //           backGroundColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //           ],
  //           borderColor: [],
  //           borderRadius: 3,
  //           borderWidth: 0,
  //           database: {
  //             labels: [
  //               "فروردین",
  //               "اردیبهشت",
  //               "خرداد",
  //               "تیر",
  //               "مرداد",
  //               // "شهریور",
  //               // "مهر",
  //               // "آبان",
  //               // "آذر",
  //               // "دی",
  //               // "بهمن",
  //               // "اسفند",
  //             ],
  //             data: [
  //               {
  //                 label: "110",
  //                 data: [32, 25, 15, 1],
  //               },
  //               {
  //                 label: "550",
  //                 data: [25, 15, 5, 5],
  //               },
  //               {
  //                 label: "275",
  //                 data: [2, 1, 1, 1],
  //               },
  //               {
  //                 label: "200",
  //                 data: [25, 15, 10, 10],
  //               },
  //               {
  //                 label: "35",
  //                 data: [10, 15, 15, 5],
  //               },
  //             ],
  //           },
  //           options: {
  //             responsive: true,
  //             maintainAspectRatio: false,
  //             scales: {
  //               y: {
  //                 beginAtZero: true,
  //               },
  //             },
  //           },
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   softwareId: "001002003",
  //   banks: [
  //     {
  //       bankId: "001002003162",
  //       bankName: "اطلاعات کالاها",
  //       charts: [
  //         {
  //           id: "001002003162001",
  //           title: "سهم فروش",
  //           type: "Doughnut",
  //           backGroundColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //             "#d7cb94",
  //           ],
  //           borderColor: [],
  //           borderWidth: 0,
  //           database: {
  //             labels: ["110", "55", "275", "200", "35", "پره"],
  //             data: [
  //               {
  //                 label: "ُسهم فروش",
  //                 data: [36, 41, 2, 19, 0, 2],
  //               },
  //             ],
  //           },
  //           options: {
  //             responsive: true,
  //             maintainAspectRatio: false,
  //             cutout: "65%",
  //             plugins: {
  //               legend: {
  //                 labels: {
  //                   usePointStyle: true,
  //                 },
  //                 display: true,
  //                 rtl: false,
  //                 position: "bottom",
  //               },
  //             },
  //             scales: {
  //               title: {
  //                 display: false,
  //               },
  //               x: {
  //                 ticks: { display: false },
  //                 grid: {
  //                   display: false,
  //                   drawBorder: false,
  //                 },
  //               },
  //               y: {
  //                 ticks: { display: false },
  //                 grid: {
  //                   display: false,
  //                   drawBorder: false,
  //                 },
  //                 // beginAtZero: true,
  //               },
  //             },
  //           },
  //         },
  //         {
  //           id: "001002003162002",
  //           title: "نمودار خطی فروش ماهانه",
  //           type: "Line",
  //           backGroundColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //           ],
  //           borderColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //           ],
  //           database: {
  //             labels: [
  //               "فروردین",
  //               "اردیبهشت",
  //               "خرداد",
  //               "تیر",
  //               "مرداد",
  //               // "شهریور",
  //               // "مهر",
  //               // "آبان",
  //               // "آذر",
  //               // "دی",
  //               // "بهمن",
  //               // "اسفند",
  //             ],
  //             data: [
  //               {
  //                 label: "110",
  //                 data: [32, 25, 15, 1],
  //               },
  //               {
  //                 label: "550",
  //                 data: [25, 15, 5, 5],
  //               },
  //               {
  //                 label: "275",
  //                 data: [2, 1, 1, 1],
  //               },
  //               {
  //                 label: "200",
  //                 data: [25, 15, 10, 10],
  //               },
  //               {
  //                 label: "35",
  //                 data: [10, 15, 15, 5],
  //               },
  //             ],
  //           },
  //           options: {
  //             tension: 0.2,
  //             responsive: true,
  //             maintainAspectRatio: false,
  //             plugins: {
  //               legend: {
  //                 labels: {
  //                   usePointStyle: true,
  //                 },
  //                 display: true,
  //                 rtl: false,
  //                 position: "top",
  //               },
  //             },
  //             scales: {
  //               y: {
  //                 // position: "right",
  //                 beginAtZero: false,
  //               },
  //             },
  //           },
  //         },
  //         {
  //           id: "001002003162003",
  //           title: "نمودار ستونی فروش ماهانه",
  //           type: "Bar",
  //           backGroundColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //           ],
  //           borderColor: [],
  //           borderRadius: 3,
  //           borderWidth: 0,
  //           database: {
  //             labels: [
  //               "فروردین",
  //               "اردیبهشت",
  //               "خرداد",
  //               "تیر",
  //               "مرداد",
  //               // "شهریور",
  //               // "مهر",
  //               // "آبان",
  //               // "آذر",
  //               // "دی",
  //               // "بهمن",
  //               // "اسفند",
  //             ],
  //             data: [
  //               {
  //                 label: "110",
  //                 data: [32, 25, 15, 1],
  //               },
  //               {
  //                 label: "550",
  //                 data: [25, 15, 5, 5],
  //               },
  //               {
  //                 label: "275",
  //                 data: [2, 1, 1, 1],
  //               },
  //               {
  //                 label: "200",
  //                 data: [25, 15, 10, 10],
  //               },
  //               {
  //                 label: "35",
  //                 data: [10, 15, 15, 5],
  //               },
  //             ],
  //           },
  //           options: {
  //             responsive: true,
  //             maintainAspectRatio: false,
  //             scales: {
  //               y: {
  //                 beginAtZero: true,
  //               },
  //             },
  //           },
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   softwareId: "001002004",
  //   banks: [
  //     {
  //       bankId: "001002004143",
  //       bankName: "سند حسابداری",
  //       charts: [
  //         {
  //           id: "001002004143001",
  //           title: "سهم فروش",
  //           type: "Doughnut",
  //           backGroundColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //             "#d7cb94",
  //           ],
  //           borderColor: [],
  //           borderWidth: 0,
  //           database: {
  //             labels: ["110", "55", "275", "200", "35", "پره"],
  //             data: [
  //               {
  //                 label: "ُسهم فروش",
  //                 data: [36, 41, 2, 19, 0, 2],
  //               },
  //             ],
  //           },
  //           options: {
  //             responsive: true,
  //             maintainAspectRatio: false,
  //             cutout: "65%",
  //             plugins: {
  //               legend: {
  //                 labels: {
  //                   usePointStyle: true,
  //                 },
  //                 display: true,
  //                 rtl: false,
  //                 position: "bottom",
  //               },
  //             },
  //             scales: {
  //               title: {
  //                 display: false,
  //               },
  //               x: {
  //                 ticks: { display: false },
  //                 grid: {
  //                   display: false,
  //                   drawBorder: false,
  //                 },
  //               },
  //               y: {
  //                 ticks: { display: false },
  //                 grid: {
  //                   display: false,
  //                   drawBorder: false,
  //                 },
  //                 // beginAtZero: true,
  //               },
  //             },
  //           },
  //         },
  //         {
  //           id: "001002004143002",
  //           title: "نمودار خطی فروش ماهانه",
  //           type: "Line",
  //           backGroundColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //           ],
  //           borderColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //           ],
  //           database: {
  //             labels: [
  //               "فروردین",
  //               "اردیبهشت",
  //               "خرداد",
  //               "تیر",
  //               "مرداد",
  //               // "شهریور",
  //               // "مهر",
  //               // "آبان",
  //               // "آذر",
  //               // "دی",
  //               // "بهمن",
  //               // "اسفند",
  //             ],
  //             data: [
  //               {
  //                 label: "110",
  //                 data: [32, 25, 15, 1],
  //               },
  //               {
  //                 label: "550",
  //                 data: [25, 15, 5, 5],
  //               },
  //               {
  //                 label: "275",
  //                 data: [2, 1, 1, 1],
  //               },
  //               {
  //                 label: "200",
  //                 data: [25, 15, 10, 10],
  //               },
  //               {
  //                 label: "35",
  //                 data: [10, 15, 15, 5],
  //               },
  //             ],
  //           },
  //           options: {
  //             tension: 0.2,
  //             responsive: true,
  //             maintainAspectRatio: false,
  //             plugins: {
  //               legend: {
  //                 labels: {
  //                   usePointStyle: true,
  //                 },
  //                 display: true,
  //                 rtl: false,
  //                 position: "top",
  //               },
  //             },
  //             scales: {
  //               y: {
  //                 // position: "right",
  //                 beginAtZero: false,
  //               },
  //             },
  //           },
  //         },
  //         {
  //           id: "001002004143003",
  //           title: "نمودار ستونی فروش ماهانه",
  //           type: "Bar",
  //           backGroundColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //           ],
  //           borderColor: [],
  //           borderRadius: 3,
  //           borderWidth: 0,
  //           database: {
  //             labels: [
  //               "فروردین",
  //               "اردیبهشت",
  //               "خرداد",
  //               "تیر",
  //               "مرداد",
  //               // "شهریور",
  //               // "مهر",
  //               // "آبان",
  //               // "آذر",
  //               // "دی",
  //               // "بهمن",
  //               // "اسفند",
  //             ],
  //             data: [
  //               {
  //                 label: "110",
  //                 data: [32, 25, 15, 1],
  //               },
  //               {
  //                 label: "550",
  //                 data: [25, 15, 5, 5],
  //               },
  //               {
  //                 label: "275",
  //                 data: [2, 1, 1, 1],
  //               },
  //               {
  //                 label: "200",
  //                 data: [25, 15, 10, 10],
  //               },
  //               {
  //                 label: "35",
  //                 data: [10, 15, 15, 5],
  //               },
  //             ],
  //           },
  //           options: {
  //             responsive: true,
  //             maintainAspectRatio: false,
  //             scales: {
  //               y: {
  //                 beginAtZero: true,
  //               },
  //             },
  //           },
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   softwareId: "001003002",
  //   banks: [
  //     {
  //       bankId: "001003002229",
  //       bankName: "فاکتور فروش قطعی",
  //       charts: [
  //         {
  //           id: "001003002229001",
  //           title: "سهم فروش",
  //           type: "Doughnut",
  //           backGroundColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //             "#d7cb94",
  //           ],
  //           borderColor: [],
  //           borderWidth: 0,
  //           database: {
  //             labels: ["110", "55", "275", "200", "35", "پره"],
  //             data: [
  //               {
  //                 label: "ُسهم فروش",
  //                 data: [36, 41, 2, 19, 0, 2],
  //               },
  //             ],
  //           },
  //           options: {
  //             responsive: true,
  //             maintainAspectRatio: false,
  //             cutout: "65%",
  //             plugins: {
  //               legend: {
  //                 labels: {
  //                   usePointStyle: true,
  //                 },
  //                 display: true,
  //                 rtl: false,
  //                 position: "bottom",
  //               },
  //             },
  //             scales: {
  //               title: {
  //                 display: false,
  //               },
  //               x: {
  //                 ticks: { display: false },
  //                 grid: {
  //                   display: false,
  //                   drawBorder: false,
  //                 },
  //               },
  //               y: {
  //                 ticks: { display: false },
  //                 grid: {
  //                   display: false,
  //                   drawBorder: false,
  //                 },
  //                 // beginAtZero: true,
  //               },
  //             },
  //           },
  //         },
  //         {
  //           id: "001003002229002",
  //           title: "نمودار خطی فروش ماهانه",
  //           type: "Line",
  //           backGroundColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //           ],
  //           borderColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //           ],
  //           database: {
  //             labels: [
  //               "فروردین",
  //               "اردیبهشت",
  //               "خرداد",
  //               "تیر",
  //               "مرداد",
  //               // "شهریور",
  //               // "مهر",
  //               // "آبان",
  //               // "آذر",
  //               // "دی",
  //               // "بهمن",
  //               // "اسفند",
  //             ],
  //             data: [
  //               {
  //                 label: "110",
  //                 data: [32, 25, 15, 1],
  //               },
  //               {
  //                 label: "550",
  //                 data: [25, 15, 5, 5],
  //               },
  //               {
  //                 label: "275",
  //                 data: [2, 1, 1, 1],
  //               },
  //               {
  //                 label: "200",
  //                 data: [25, 15, 10, 10],
  //               },
  //               {
  //                 label: "35",
  //                 data: [10, 15, 15, 5],
  //               },
  //             ],
  //           },
  //           options: {
  //             tension: 0.2,
  //             responsive: true,
  //             maintainAspectRatio: false,
  //             plugins: {
  //               legend: {
  //                 labels: {
  //                   usePointStyle: true,
  //                 },
  //                 display: true,
  //                 rtl: false,
  //                 position: "top",
  //               },
  //             },
  //             scales: {
  //               y: {
  //                 // position: "right",
  //                 beginAtZero: false,
  //               },
  //             },
  //           },
  //         },
  //         {
  //           id: "001003002229003",
  //           title: "نمودار ستونی فروش ماهانه",
  //           type: "Bar",
  //           backGroundColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //           ],
  //           borderColor: [],
  //           borderRadius: 3,
  //           borderWidth: 0,
  //           database: {
  //             labels: [
  //               "فروردین",
  //               "اردیبهشت",
  //               "خرداد",
  //               "تیر",
  //               "مرداد",
  //               // "شهریور",
  //               // "مهر",
  //               // "آبان",
  //               // "آذر",
  //               // "دی",
  //               // "بهمن",
  //               // "اسفند",
  //             ],
  //             data: [
  //               {
  //                 label: "110",
  //                 data: [32, 25, 15, 1],
  //               },
  //               {
  //                 label: "550",
  //                 data: [25, 15, 5, 5],
  //               },
  //               {
  //                 label: "275",
  //                 data: [2, 1, 1, 1],
  //               },
  //               {
  //                 label: "200",
  //                 data: [25, 15, 10, 10],
  //               },
  //               {
  //                 label: "35",
  //                 data: [10, 15, 15, 5],
  //               },
  //             ],
  //           },
  //           options: {
  //             responsive: true,
  //             maintainAspectRatio: false,
  //             scales: {
  //               y: {
  //                 beginAtZero: true,
  //               },
  //             },
  //           },
  //         },
  //       ],
  //     },
  //     {
  //       bankId: "001003002262",
  //       bankName: "دفترروزنامه",
  //       charts: [
  //         {
  //           id: "001003002262001",
  //           title: "سهم فروش",
  //           type: "Doughnut",
  //           backGroundColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //             "#d7cb94",
  //           ],
  //           borderColor: [],
  //           borderWidth: 0,
  //           database: {
  //             labels: ["110", "55", "275", "200", "35", "پره"],
  //             data: [
  //               {
  //                 label: "ُسهم فروش",
  //                 data: [36, 41, 2, 19, 0, 2],
  //               },
  //             ],
  //           },
  //           options: {
  //             responsive: true,
  //             maintainAspectRatio: false,
  //             cutout: "65%",
  //             plugins: {
  //               legend: {
  //                 labels: {
  //                   usePointStyle: true,
  //                 },
  //                 display: true,
  //                 rtl: false,
  //                 position: "bottom",
  //               },
  //             },
  //             scales: {
  //               title: {
  //                 display: false,
  //               },
  //               x: {
  //                 ticks: { display: false },
  //                 grid: {
  //                   display: false,
  //                   drawBorder: false,
  //                 },
  //               },
  //               y: {
  //                 ticks: { display: false },
  //                 grid: {
  //                   display: false,
  //                   drawBorder: false,
  //                 },
  //                 // beginAtZero: true,
  //               },
  //             },
  //           },
  //         },
  //         {
  //           id: "001003002262002",
  //           title: "نمودار خطی فروش ماهانه",
  //           type: "Line",
  //           backGroundColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //           ],
  //           borderColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //           ],
  //           database: {
  //             labels: [
  //               "فروردین",
  //               "اردیبهشت",
  //               "خرداد",
  //               "تیر",
  //               "مرداد",
  //               // "شهریور",
  //               // "مهر",
  //               // "آبان",
  //               // "آذر",
  //               // "دی",
  //               // "بهمن",
  //               // "اسفند",
  //             ],
  //             data: [
  //               {
  //                 label: "110",
  //                 data: [32, 25, 15, 1],
  //               },
  //               {
  //                 label: "550",
  //                 data: [25, 15, 5, 5],
  //               },
  //               {
  //                 label: "275",
  //                 data: [2, 1, 1, 1],
  //               },
  //               {
  //                 label: "200",
  //                 data: [25, 15, 10, 10],
  //               },
  //               {
  //                 label: "35",
  //                 data: [10, 15, 15, 5],
  //               },
  //             ],
  //           },
  //           options: {
  //             tension: 0.2,
  //             responsive: true,
  //             maintainAspectRatio: false,
  //             plugins: {
  //               legend: {
  //                 labels: {
  //                   usePointStyle: true,
  //                 },
  //                 display: true,
  //                 rtl: false,
  //                 position: "top",
  //               },
  //             },
  //             scales: {
  //               y: {
  //                 // position: "right",
  //                 beginAtZero: false,
  //               },
  //             },
  //           },
  //         },
  //         {
  //           id: "001003002262003",
  //           title: "نمودار ستونی فروش ماهانه",
  //           type: "Bar",
  //           backGroundColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //           ],
  //           borderColor: [],
  //           borderRadius: 3,
  //           borderWidth: 0,
  //           database: {
  //             labels: [
  //               "فروردین",
  //               "اردیبهشت",
  //               "خرداد",
  //               "تیر",
  //               "مرداد",
  //               // "شهریور",
  //               // "مهر",
  //               // "آبان",
  //               // "آذر",
  //               // "دی",
  //               // "بهمن",
  //               // "اسفند",
  //             ],
  //             data: [
  //               {
  //                 label: "110",
  //                 data: [32, 25, 15, 1],
  //               },
  //               {
  //                 label: "550",
  //                 data: [25, 15, 5, 5],
  //               },
  //               {
  //                 label: "275",
  //                 data: [2, 1, 1, 1],
  //               },
  //               {
  //                 label: "200",
  //                 data: [25, 15, 10, 10],
  //               },
  //               {
  //                 label: "35",
  //                 data: [10, 15, 15, 5],
  //               },
  //             ],
  //           },
  //           options: {
  //             responsive: true,
  //             maintainAspectRatio: false,
  //             scales: {
  //               y: {
  //                 beginAtZero: true,
  //               },
  //             },
  //           },
  //         },
  //       ],
  //     },
  //     {
  //       bankId: "001003002228",
  //       bankName: "فاکتور خرید قطعی",
  //       charts: [
  //         {
  //           id: "001003002228001",
  //           title: "سهم فروش",
  //           type: "Doughnut",
  //           backGroundColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //             "#d7cb94",
  //           ],
  //           borderColor: [],
  //           borderWidth: 0,
  //           database: {
  //             labels: ["110", "55", "275", "200", "35", "پره"],
  //             data: [
  //               {
  //                 label: "ُسهم فروش",
  //                 data: [36, 41, 2, 19, 0, 2],
  //               },
  //             ],
  //           },
  //           options: {
  //             responsive: true,
  //             maintainAspectRatio: false,
  //             cutout: "65%",
  //             plugins: {
  //               legend: {
  //                 labels: {
  //                   usePointStyle: true,
  //                 },
  //                 display: true,
  //                 rtl: false,
  //                 position: "bottom",
  //               },
  //             },
  //             scales: {
  //               title: {
  //                 display: false,
  //               },
  //               x: {
  //                 ticks: { display: false },
  //                 grid: {
  //                   display: false,
  //                   drawBorder: false,
  //                 },
  //               },
  //               y: {
  //                 ticks: { display: false },
  //                 grid: {
  //                   display: false,
  //                   drawBorder: false,
  //                 },
  //                 // beginAtZero: true,
  //               },
  //             },
  //           },
  //         },
  //         {
  //           id: "001003002228002",
  //           title: "نمودار خطی فروش ماهانه",
  //           type: "Line",
  //           backGroundColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //           ],
  //           borderColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //           ],
  //           database: {
  //             labels: [
  //               "فروردین",
  //               "اردیبهشت",
  //               "خرداد",
  //               "تیر",
  //               "مرداد",
  //               // "شهریور",
  //               // "مهر",
  //               // "آبان",
  //               // "آذر",
  //               // "دی",
  //               // "بهمن",
  //               // "اسفند",
  //             ],
  //             data: [
  //               {
  //                 label: "110",
  //                 data: [32, 25, 15, 1],
  //               },
  //               {
  //                 label: "550",
  //                 data: [25, 15, 5, 5],
  //               },
  //               {
  //                 label: "275",
  //                 data: [2, 1, 1, 1],
  //               },
  //               {
  //                 label: "200",
  //                 data: [25, 15, 10, 10],
  //               },
  //               {
  //                 label: "35",
  //                 data: [10, 15, 15, 5],
  //               },
  //             ],
  //           },
  //           options: {
  //             tension: 0.2,
  //             responsive: true,
  //             maintainAspectRatio: false,
  //             plugins: {
  //               legend: {
  //                 labels: {
  //                   usePointStyle: true,
  //                 },
  //                 display: true,
  //                 rtl: false,
  //                 position: "top",
  //               },
  //             },
  //             scales: {
  //               y: {
  //                 // position: "right",
  //                 beginAtZero: false,
  //               },
  //             },
  //           },
  //         },
  //         {
  //           id: "001003002228003",
  //           title: "نمودار ستونی فروش ماهانه",
  //           type: "Bar",
  //           backGroundColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //           ],
  //           borderColor: [],
  //           borderRadius: 3,
  //           borderWidth: 0,
  //           database: {
  //             labels: [
  //               "فروردین",
  //               "اردیبهشت",
  //               "خرداد",
  //               "تیر",
  //               "مرداد",
  //               // "شهریور",
  //               // "مهر",
  //               // "آبان",
  //               // "آذر",
  //               // "دی",
  //               // "بهمن",
  //               // "اسفند",
  //             ],
  //             data: [
  //               {
  //                 label: "110",
  //                 data: [32, 25, 15, 1],
  //               },
  //               {
  //                 label: "550",
  //                 data: [25, 15, 5, 5],
  //               },
  //               {
  //                 label: "275",
  //                 data: [2, 1, 1, 1],
  //               },
  //               {
  //                 label: "200",
  //                 data: [25, 15, 10, 10],
  //               },
  //               {
  //                 label: "35",
  //                 data: [10, 15, 15, 5],
  //               },
  //             ],
  //           },
  //           options: {
  //             responsive: true,
  //             maintainAspectRatio: false,
  //             scales: {
  //               y: {
  //                 beginAtZero: true,
  //               },
  //             },
  //           },
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   softwareId: "001004002",
  //   banks: [
  //     {
  //       bankId: "001004002229",
  //       bankName: "فاکتور فروش قطعی",
  //       charts: [
  //         {
  //           id: "001004002229001",
  //           title: "سهم فروش",
  //           type: "Doughnut",
  //           backGroundColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //             "#d7cb94",
  //           ],
  //           borderColor: [],
  //           borderWidth: 0,
  //           database: {
  //             labels: ["110", "55", "275", "200", "35", "پره"],
  //             data: [
  //               {
  //                 label: "ُسهم فروش",
  //                 data: [36, 41, 2, 19, 0, 2],
  //               },
  //             ],
  //           },
  //           options: {
  //             responsive: true,
  //             maintainAspectRatio: false,
  //             cutout: "65%",
  //             plugins: {
  //               legend: {
  //                 labels: {
  //                   usePointStyle: true,
  //                 },
  //                 display: true,
  //                 rtl: false,
  //                 position: "bottom",
  //               },
  //             },
  //             scales: {
  //               title: {
  //                 display: false,
  //               },
  //               x: {
  //                 ticks: { display: false },
  //                 grid: {
  //                   display: false,
  //                   drawBorder: false,
  //                 },
  //               },
  //               y: {
  //                 ticks: { display: false },
  //                 grid: {
  //                   display: false,
  //                   drawBorder: false,
  //                 },
  //                 // beginAtZero: true,
  //               },
  //             },
  //           },
  //         },
  //         {
  //           id: "001004002229002",
  //           title: "نمودار خطی فروش ماهانه",
  //           type: "Line",
  //           backGroundColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //           ],
  //           borderColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //           ],
  //           database: {
  //             labels: [
  //               "فروردین",
  //               "اردیبهشت",
  //               "خرداد",
  //               "تیر",
  //               "مرداد",
  //               // "شهریور",
  //               // "مهر",
  //               // "آبان",
  //               // "آذر",
  //               // "دی",
  //               // "بهمن",
  //               // "اسفند",
  //             ],
  //             data: [
  //               {
  //                 label: "110",
  //                 data: [32, 25, 15, 1],
  //               },
  //               {
  //                 label: "550",
  //                 data: [25, 15, 5, 5],
  //               },
  //               {
  //                 label: "275",
  //                 data: [2, 1, 1, 1],
  //               },
  //               {
  //                 label: "200",
  //                 data: [25, 15, 10, 10],
  //               },
  //               {
  //                 label: "35",
  //                 data: [10, 15, 15, 5],
  //               },
  //             ],
  //           },
  //           options: {
  //             tension: 0.2,
  //             responsive: true,
  //             maintainAspectRatio: false,
  //             plugins: {
  //               legend: {
  //                 labels: {
  //                   usePointStyle: true,
  //                 },
  //                 display: true,
  //                 rtl: false,
  //                 position: "top",
  //               },
  //             },
  //             scales: {
  //               y: {
  //                 // position: "right",
  //                 beginAtZero: false,
  //               },
  //             },
  //           },
  //         },
  //         {
  //           id: "001004002229003",
  //           title: "نمودار ستونی فروش ماهانه",
  //           type: "Bar",
  //           backGroundColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //           ],
  //           borderColor: [],
  //           borderRadius: 3,
  //           borderWidth: 0,
  //           database: {
  //             labels: [
  //               "فروردین",
  //               "اردیبهشت",
  //               "خرداد",
  //               "تیر",
  //               "مرداد",
  //               // "شهریور",
  //               // "مهر",
  //               // "آبان",
  //               // "آذر",
  //               // "دی",
  //               // "بهمن",
  //               // "اسفند",
  //             ],
  //             data: [
  //               {
  //                 label: "110",
  //                 data: [32, 25, 15, 1],
  //               },
  //               {
  //                 label: "550",
  //                 data: [25, 15, 5, 5],
  //               },
  //               {
  //                 label: "275",
  //                 data: [2, 1, 1, 1],
  //               },
  //               {
  //                 label: "200",
  //                 data: [25, 15, 10, 10],
  //               },
  //               {
  //                 label: "35",
  //                 data: [10, 15, 15, 5],
  //               },
  //             ],
  //           },
  //           options: {
  //             responsive: true,
  //             maintainAspectRatio: false,
  //             scales: {
  //               y: {
  //                 beginAtZero: true,
  //               },
  //             },
  //           },
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   softwareId: "001004003",
  //   banks: [
  //     {
  //       bankId: "001004003162",
  //       bankName: "اطلاعات کالاها",
  //       charts: [
  //         {
  //           id: "001004003162001",
  //           title: "سهم فروش",
  //           type: "Doughnut",
  //           backGroundColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //             "#d7cb94",
  //           ],
  //           borderColor: [],
  //           borderWidth: 0,
  //           database: {
  //             labels: ["110", "55", "275", "200", "35", "پره"],
  //             data: [
  //               {
  //                 label: "ُسهم فروش",
  //                 data: [36, 41, 2, 19, 0, 2],
  //               },
  //             ],
  //           },
  //           options: {
  //             responsive: true,
  //             maintainAspectRatio: false,
  //             cutout: "65%",
  //             plugins: {
  //               legend: {
  //                 labels: {
  //                   usePointStyle: true,
  //                 },
  //                 display: true,
  //                 rtl: false,
  //                 position: "bottom",
  //               },
  //             },
  //             scales: {
  //               title: {
  //                 display: false,
  //               },
  //               x: {
  //                 ticks: { display: false },
  //                 grid: {
  //                   display: false,
  //                   drawBorder: false,
  //                 },
  //               },
  //               y: {
  //                 ticks: { display: false },
  //                 grid: {
  //                   display: false,
  //                   drawBorder: false,
  //                 },
  //                 // beginAtZero: true,
  //               },
  //             },
  //           },
  //         },
  //         {
  //           id: "001004003162002",
  //           title: "نمودار خطی فروش ماهانه",
  //           type: "Line",
  //           backGroundColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //           ],
  //           borderColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //           ],
  //           database: {
  //             labels: [
  //               "فروردین",
  //               "اردیبهشت",
  //               "خرداد",
  //               "تیر",
  //               "مرداد",
  //               // "شهریور",
  //               // "مهر",
  //               // "آبان",
  //               // "آذر",
  //               // "دی",
  //               // "بهمن",
  //               // "اسفند",
  //             ],
  //             data: [
  //               {
  //                 label: "110",
  //                 data: [32, 25, 15, 1],
  //               },
  //               {
  //                 label: "550",
  //                 data: [25, 15, 5, 5],
  //               },
  //               {
  //                 label: "275",
  //                 data: [2, 1, 1, 1],
  //               },
  //               {
  //                 label: "200",
  //                 data: [25, 15, 10, 10],
  //               },
  //               {
  //                 label: "35",
  //                 data: [10, 15, 15, 5],
  //               },
  //             ],
  //           },
  //           options: {
  //             tension: 0.2,
  //             responsive: true,
  //             maintainAspectRatio: false,
  //             plugins: {
  //               legend: {
  //                 labels: {
  //                   usePointStyle: true,
  //                 },
  //                 display: true,
  //                 rtl: false,
  //                 position: "top",
  //               },
  //             },
  //             scales: {
  //               y: {
  //                 // position: "right",
  //                 beginAtZero: false,
  //               },
  //             },
  //           },
  //         },
  //         {
  //           id: "001004003162003",
  //           title: "نمودار ستونی فروش ماهانه",
  //           type: "Bar",
  //           backGroundColor: [
  //             "rgba(116, 103, 240, 1)",
  //             "rgba(255, 165, 80, 1)",
  //             "rgba(234, 96, 97, 1)",
  //             "rgba(0, 136, 132, 1)",
  //             "rgba(152, 148, 215, 1)",
  //           ],
  //           borderColor: [],
  //           borderRadius: 3,
  //           borderWidth: 0,
  //           database: {
  //             labels: [
  //               "فروردین",
  //               "اردیبهشت",
  //               "خرداد",
  //               "تیر",
  //               "مرداد",
  //               // "شهریور",
  //               // "مهر",
  //               // "آبان",
  //               // "آذر",
  //               // "دی",
  //               // "بهمن",
  //               // "اسفند",
  //             ],
  //             data: [
  //               {
  //                 label: "110",
  //                 data: [32, 25, 15, 1],
  //               },
  //               {
  //                 label: "550",
  //                 data: [25, 15, 5, 5],
  //               },
  //               {
  //                 label: "275",
  //                 data: [2, 1, 1, 1],
  //               },
  //               {
  //                 label: "200",
  //                 data: [25, 15, 10, 10],
  //               },
  //               {
  //                 label: "35",
  //                 data: [10, 15, 15, 5],
  //               },
  //             ],
  //           },
  //           options: {
  //             responsive: true,
  //             maintainAspectRatio: false,
  //             scales: {
  //               y: {
  //                 beginAtZero: true,
  //               },
  //             },
  //           },
  //         },
  //       ],
  //     },
  //   ],
  // },
];
