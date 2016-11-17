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
        time: new Date(1479747600000),
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
          }
      }, {
        _id: 1,
        title: 'Jogging in Central Park',
        description: 'Come get some exercise!',
        locations: [
          {"lat":40.7848582,"lng":-73.96965190000003}
        ],
        categories: ['fitness'],
        time: new Date(1479747600000)
      }, {
        _id: 2,
        title: 'Night Out at UCB',
        description: 'Food and comedy!',
        locations: [
          {"lat":40.74753,"lng":-73.99763999999999}
        ],
        categories: ['food', 'recreation', 'nightlife'],
        time: new Date(1480194000000),
        guests: {
          pending: [
            {
              id: 1400259734,
              name: 'Neha Agarwal'
            },
            {
              id: 1650481413,
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
        }
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
                    id: 1650481413,
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
        time: new Date(1480539600000),
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
              id: 1650481413,
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
        "time": new Date("2016-11-23T19:00:00.000Z"),
        "description":"Let's get into the fall spirit with some apple picking! Anyone is welcome!"
      },
      {
        "title":"Bar Crawl",
        "categories":["food","nightlife"],
        "plans":[{"text":"Meet at Murphy's","time":null,"discussion":[]},
          {"text":"Head to Legends","time":null,"discussion":[]},
          {"text":"Finish up at Joe's!","time":null,"discussion":[]}],
        "locations":[{"lat":40.1103855,"lng":-88.2301286},{"lat":40.1105053,"lng":-88.23116419999997},{"lat":40.109702,"lng":-88.231855}],
        "guests":{"pending":[],"confirmed":[{"id":"1650481413","name":"Krishna Dusad"}]},
        "creator":{"id":"1650481413","name":"Krishna Dusad"},
        "_id":5,
        "time": new Date("2016-11-26T02:30:00.000Z"),
        "description":"Nothing says \"University of Illinois\" quite like a bar crawl. So let's have fun! All are welcome! Unless you're, like, twelve."
      }
    ];

  });
