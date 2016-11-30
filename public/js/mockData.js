angular.module('Data', [])
  .factory('MockData', function() {
    return [
      {
        _id: 0,
        title: 'MoMA Trip',
        description: 'Let\'s go to a museum!',
        locations: [
          {"lat":40.7614327,"lng":-73.97762160000002}
        ],
        categories: ['museums'],
        time: new Date("2016-12-16T19:00:00.000Z"),
        guests: 
        {
          pending: [],
          confirmed: [
            {
              id: 1418723404822195,
              name: 'Chad Franzen',
            }
          ]
        },
        creator: 
          {
            id: 100006483844947,
            name: 'Violet Zhao',
          },
        plans: [
          {
            text: 'Stare at art',
            time: null,
            discussion: []
          },
          {
            text: 'See the new exhibit',
            time: null,
            discussion: []
          },
          {
            text: 'Go to the gift shop',
            time: null,
            discussion: []
          }
        ]
      }, {
        _id: 2,
        title: 'Night Out at UCB',
        description: 'Food and comedy!',
        locations: [
          {"lat":40.74753,"lng":-73.99763999999999}
        ],
        categories: ['food', 'recreation', 'nightlife'],
        time: new Date("2016-12-11T20:00:00.000Z"),
        guests: {
          pending: [
            {
              id: 1400259734,
              name: 'Neha Agarwal'
            },
            {
              id: 10209525432366598,
              name: 'Krishna Dusad',
            }
          ],
          confirmed: [
            {
              id: 100006483844947,
              name: 'Violet Zhao',
            },
            {
              id: 1418723404822195,
              name: 'Chad Franzen',
            }
          ]
        },
         creator: {
          id: 1418723404822195,
          name: 'Chad Franzen',
         },
        plans: [
          {
            text: 'Meet up at UCB!',
            time: null,
            discussion: []
          },
          {
            text: 'Watch an improv show',
            time: null,
            discussion: []
          },
          {
            text: 'Get drinks afterwards',
            time: null,
            discussion: []
          }
        ]
      },

       {
        _id: 3,
        title: 'Quad Tour!',
        description: 'Let\'s explore U of I! This tour is great for people new to campus or just visiting :)',
        locations: [
          {"lat":40.109387,"lng":-88.2272456},
          {"lat":40.11380279999999,"lng":-88.22490519999997},
          {"lat":40.1179765,"lng":-88.2402697}
        ],
        creator: {
          id: 100006483844947,
          name: 'Violet Zhao',
        },
        plans: [
          {
            text: 'Chat at the Union',
            time: null,
            discussion: [
              {
                post: {
                  author: {
                    id: 10209525432366598,
                    name: 'Krishna Dusad',
                  },
                  text: 'Sounds good!',
                  time: new Date('2016-11-17T03:49:30.693Z')
                },
                replies: [
                  {
                    author: {
                      id: 100006483844947,
                      name: 'Violet Zhao',
                    },
                    text: 'Same.',
                    time: new Date('2016-11-17T03:51:30.693Z')
                  }
                ]
              },
              {
                post: {
                  author: {
                    id: 100006483844947,
                    name: 'Violet Zhao',
                  },
                  text: 'We should get food while we\'re here!',
                  time: new Date('2016-11-17T03:51:30.693Z')
                },
                replies: []
              }
            ]
          },
          {
            text: 'Go to Siebel Center',
            time: null,
            discussion: []
          },
          {
            text: 'Get dinner at Black Dog!',
            time: null,
            discussion: []
          }
        ],
        categories: ['recreation'],
        time: new Date("2016-12-11T19:00:00.000Z"),
        guests: {
          pending: [
            {
              id: 1400259734,
              name: 'Neha Agarwal'
            }
          ],
          confirmed: [
            {
              id: 100006483844947,
              name: 'Violet Zhao',
            },
            {
              id: 10209525432366598,
              name: 'Krishna Dusad',
            },
            {
              id: 1418723404822195,
              name: 'Chad Franzen',
            }
          ]
        }
      },
      {
        "title":"Apple Picking!",
        "categories":["food","nature","recreation"],
        "plans":[{"text":"Meet outside the orchard","time":null,"discussion":[]},
          {"text":"Pick apples!","time":null,"discussion":[]},
          {"text":"Eat cinnamon donuts","time":null,"discussion":[]}],
        "locations":[{"lat":40.0639528,"lng":-88.29221749999999}
        ],
        "guests":
          {"pending":[],
            "confirmed":
              [{"id":"100006483844947","name":"Violet Zhao"}]},
        "creator":{"id":"100006483844947","name":"Violet Zhao"},
        "_id":4,
        "time": new Date("2016-12-16T19:00:00.000Z"),
        "description":"Let's get into the fall spirit with some apple picking! Anyone is welcome!"
      },
      {
        "title":"Bar Crawl",
        "categories":["food","nightlife"],
        "plans":[{"text":"Meet at Murphy's","time":null,"discussion":[]},
          {"text":"Head to Legends","time":null,"discussion":[]},
          {"text":"Finish up at Joe's!","time":null,"discussion":[]}],
        "locations":[{"lat":40.1103855,"lng":-88.2301286},{"lat":40.1105053,"lng":-88.23116419999997},{"lat":40.109702,"lng":-88.231855}],
        "guests":{"pending":[],"confirmed":[{"id":"10209525432366598","name":"Krishna Dusad"}]},
        "creator":{"id":"10209525432366598","name":"Krishna Dusad"},
        "_id":5,
        "time": new Date("2016-12-15T02:30:00.000Z"),
        "description":"Nothing says \"University of Illinois\" quite like a bar crawl. So let's have fun! All are welcome! Unless you're, like, twelve."
      },
      {"title":"The Nutcracker Show","categories":["museums","recreation","nightlife"],"plans":[{"text":"Lets get Dinner Before!","time":null,"discussion":[]}],"locations":[{"lat":40.1080232,"lng":-88.22273039999999}],"guests":{"pending":[],"confirmed":[{"id":"10211192248907629","name":"Neha Agarwal"}]},"_id":6,"time": new Date("2016-12-13T13:35:00.000Z"),"description":"TRYON FESTIVAL THEATRE\nChampaign-Urbana Ballet\nChampaign-Urbana Symphony Orchestra","creator":{"id":"10211192248907629","name":"Neha Agarwal"}},
      {"title":"Illinois Football Game","categories": ["fitness","recreation","food"],"plans":[{"text":"Who wants to Tailgate?","time":null,"discussion":[]},{"text":"What section will seats be?","time":null,"discussion":[]}],"locations":[{"lat":40.1010975,"lng":-88.23646500000001},{"lat":40.09932680000001,"lng":-88.23595690000002}],"guests":{"pending":[],"confirmed":[{"id":"10211192248907629","name":"Neha Agarwal"}]},"_id":7,"time": new Date("2016-12-19T20:00:00.000Z"),"description":"Lets go watch some football, University of Illinois versus Wisconsin. ","creator":{"id":"10211192248907629","name":"Neha Agarwal"}},
      {"title":"Times Square Tour","categories": ["nightlife","recreation","food","historical","architecture"],"plans":[{"text":"M&M world!","time":null,"discussion":[]},{"text":"I love NY shirt!","time":null,"discussion":[]}],"locations":[{"lat":40.75901100000001,"lng":-73.98447220000003}],"guests":{"pending":[],"confirmed":[{"id":"10211192248907629","name":"Neha Agarwal"}, {
              id: 1418723404822195,
              name: 'Chad Franzen',
            }]},"_id":8,"time": new Date("2016-11-22T03:30:00.000Z"),"description":"Roam around one of the most bright-lighted places you will ever see! ","creator":{"id":"10211192248907629","name":"Neha Agarwal"}},
      {"title":"The Museum of Flight","categories": ["museums","recreation","historical"],"plans":[{"text":"We will split into groups","time":null,"discussion":[]}],"locations":[{"lat":47.5182137,"lng":-122.29667289999998}],"guests":{"pending":[],"confirmed":[{"id":"10211192248907629","name":"Neha Agarwal"}]},"_id":9,"time": new Date("2017-01-04T21:24:00.000Z"),"description":"Walk the aisle of JFK's Air Force One and climb aboard the West Coast's only Concorde. Revel in the history and heroics of WWI and WWII. \n","creator":{"id":"10211192248907629","name":"Neha Agarwal"}},
      {"title":"Beach Day!","categories":["nature","food","recreation"],"plans":[{"text":"Bring Sunscreen!","time":null,"discussion":[]},{"text":"Who is making the party playlist?","time":null,"discussion":[]}],"locations":[{"lat":25.780981,"lng":-80.12996149999998}],"guests":{"pending":[],"confirmed":[{"id":"10211192248907629","name":"Neha Agarwal"}]},"_id":10,"time":"2017-03-31T18:00:00.000Z","description":"Spring Break party at the beach, with good music, company, and food! ","creator":{"id":"10211192248907629","name":"Neha Agarwal"}},
      {"title":"St. Bernard de Clairvaux Church","categories": ["museums","architecture","historical","recreation"],"plans":[{"text":"Architecture is so cool!","time":null,"discussion":[]},{"text":"I am history major","time":null,"discussion":[]}],"locations":[{"lat":25.9305529,"lng":-80.15528469999998}],"guests":{"pending":[],"confirmed":[{"id":"10211192248907629","name":"Neha Agarwal"}]},"_id":11,"time":"2017-02-13T22:40:00.000Z","description":"St. Bernard de Clairvaux Church is a medieval Spanish monastery cloister which was built in the town of Sacramenia in Segovia. ","creator":{"id":"10211192248907629","name":"Neha Agarwal"}},
      {"title":"Yoga at Emerald Necklace","categories": ["fitness","recreation","nature"],"plans":[],"locations":[{"lat":42.3225351,"lng":-71.1169683}],"guests":{"pending":[],"confirmed":[{"id":"10211192248907629","name":"Neha Agarwal"}]},"_id":12,"time":"2017-04-05T13:00:00.000Z","description":"Enjoy and relax with some yoga! Peaceful music will be playing in the background\n","creator":{"id":"10211192248907629","name":"Neha Agarwal"}}
    ];

  });
