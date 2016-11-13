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
        time: new Date(1479747600000)
      }, {
        _id: 1,
        title: 'Jogging in Central Park',
        description: 'Come get some exercise!',
        locations: [
          {"lat":40.7848582,"lng":-73.96965190000003}
        ],
        categories: ['fitness'],
        time: new Date(1479913200000)
      }, {
        _id: 2,
        title: 'Night Out at UCB',
        description: 'Food and comedy!',
        locations: [
          {"lat":40.74753,"lng":-73.99763999999999}
        ],
        categories: ['food', 'recreation', 'nightlife'],
        time: new Date(1480194000000)
      }, {
        _id: 3,
        title: 'Halloween Tour!',
        description: 'Let\'s get spooky. Lorem ipsum dolor sit amet, elementum justo eget dui in, libero in, in et vestibulum parturient consequat molestie. Enim suspendisse ipsum. Suspendisse ipsum duis egestas.',
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
                  text: 'Sounds good!'
                },
                replies: [
                  {
                    author: {
                      id: 100006483844947,
                      name: 'Violet Zhao',
                    },
                    text: 'Same.'
                  }
                ]
              },
              {
                post: {
                  author: {
                    id: 100006483844947,
                    name: 'Violet Zhao',
                  },
                  text: 'I like the Union.'
                },
                replies: []
              }
            ]
          },
          {
            text: 'Go to Siebel Center',
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
            }
          ]
        }
      },
    ];

  });
