/* jshint globalstrict: true, eqnull: true */
/* globals angular, _, d3, S, $, window */

'use strict';

angular.module('app', ['dragularModule']).config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode({
        enable : true,
        requireBase : false
    });
}]);

angular.module('app').controller('RugbyController', ['$scope', '$http', function($scope, $http) {
    var allTeams = [];

    $scope.groups = { 'A' : [] , 'B' : [] , 'C' : [] , 'D' : [], 'E' : [], 'F' : [], 'G' : [], 'H' : [] };
    $scope.palmares = [
        [
            [{ group : 'A' , order : 1 } , { group : 'B' , order : 2}],
            [{ group : 'C' , order : 1 } , { group : 'D' , order : 2}],
            [{ group : 'E' , order : 1 } , { group : 'F' , order : 2}],
            [{ group : 'G' , order : 1 } , { group : 'H' , order : 2}],
            [{ group : 'B' , order : 1 } , { group : 'A' , order : 2}],
            [{ group : 'D' , order : 1 } , { group : 'C' , order : 2}],
            [{ group : 'F' , order : 1 } , { group : 'E' , order : 2}],
            [{ group : 'H' , order : 1 } , { group : 'G' , order : 2}]
        ],
        [
            [{} , {}],
            [{} , {}],
            [{} , {}],
            [{} , {}]
        ],
        [
            [{} , {}],
            [{} , {}]
        ],
        [
            [{} , {}]
        ],
        [
            [{}]
        ]
    ];

    // Mapping one round to the next one
    $scope.mapping = [
        [
            [[0, 0], [0, 0]], [[0, 1], [0, 1]], [[1, 0], [1, 0]], [[1, 1], [1, 1]],
            [[2, 0], [2, 0]], [[2, 1], [2, 1]], [[3, 0], [3, 0]], [[3, 1], [3, 1]]
        ],
        [
            [[0, 0], [0, 0]], [[0, 1], [0, 1]],
            [[1, 0], [1, 0]], [[1, 1], [1, 1]]
        ],
        [
            [[0, 0], [0, 0]],
            [[0, 1], [0, 1]]
        ],
        [
            [[0, 0], [0, 0]]
        ]
    ];

    $http.get('assets/groups.tsv').then(function(response) {
        allTeams = d3.tsv.parse(response.data, function(d) {
            return {
                id : +d.Id,
                iso : d.Iso.toLowerCase(),
                country : d.Pays,
                group : d.Groupe,
                initials : d.Initiales,
                fullcountry : d['Pays complet'],

                color : d.Couleur,
                textColor : d['Couleur texte'],
                slug : S(d.Pays).slugify().s,

                order : -1
            };
        });
        //$scope.groups = _.groupBy(allTeams, 'group');
        allTeams.forEach(function (d) {
            $scope.groups[d.group].push(d)
        })

        $scope.locked = false;

        $scope.isNext = false;

        $scope.empty = false;

        /*
        ** Init from URL
        */
        window.setTimeout(function() {
            $scope.$apply(function() {
                var before8 = function(id, idx) {
                    var team = _.find(allTeams, { id : id });
                    team.order = (idx % 2) ? 2 : 1;

                    $('.group__flag[x-team="' + team.id +'"]')
                        .clone()
                        .appendTo($('.group__pronostics ' +
                                     'li[x-group="' + team.group + '"]')
                            .get((idx % 2) ? 1 : 0));

                    $scope.selectModels[team.group][idx % 2] = team.slug;
                };

                _.each(window.location.search.replace(/^\?/, '').split('&'), function(search) {
                    search = search.split('=');
                    if (search[0] === 'p') {
                        var ids = search[1].split(';');
                        if (ids.length === 31) {
                            _.each(ids, function(id, idx) {
                                var team = _.find(allTeams, { id : parseInt(id) });
                                if (idx < 16) {
                                    before8(parseInt(id), idx);
                                } else if (idx < 24) {
                                    var map = [0, 0, 1, 1, 2, 2, 3, 3];
                                    $scope.palmares[1][map[idx - 16]][idx % 2].group = team.group;
                                    $scope.palmares[1][map[idx - 16]][idx % 2].order = team.order;
                                } else if (idx < 28) {
                                    $scope.palmares[2][idx < 26 ? 0 : 1][idx %2].group = team.group;
                                    $scope.palmares[2][idx < 26 ? 0 : 1][idx %2].order = team.order;
                                } else if (idx < 30) {
                                    $scope.palmares[3][0][idx % 2].group = team.group;
                                    $scope.palmares[3][0][idx % 2].order = team.order;
                                } else {
                                    $scope.palmares[4][0][0].group = team.group;
                                    $scope.palmares[4][0][0].order = team.order;
                                }
                            });
                        }
                    } else {
                        /* Phase de poules */
                        // Do nothing
                        /* Phase finale */
                        // Pour connaitre les id des équipes => console.log(allTeams)
                        $scope.locked = true;
                        const france = 1
                        const russie = 2
                        const allemagne = 3
                        const bresil = 4
                        const portugal = 5
                        const argentine = 6
                        const belgique = 7
                        const pologne = 8
                        const espagne = 9
                        const perou = 10
                        const suisse = 11
                        const angleterre = 12
                        const colombie = 13
                        const mexique = 14
                        const uruguay = 15
                        const croatie = 16
                        const danemark = 17
                        const islande = 18
                        const costa_rica = 19
                        const suede = 20
                        const tunisie = 21
                        const egypte = 22
                        const senegal = 23
                        const iran = 24
                        const serbie = 25
                        const nigeria = 26
                        const australie = 27
                        const japon = 28
                        const maroc = 29
                        const panama = 30
                        const coree_du_sud = 31
                        const arabie_saoudite = 32
                        var roundOfSixteen = [
                            uruguay, russie,
                            espagne, portugal,
                            france, danemark,
                            croatie, argentine,
                            suede, mexique,
                            bresil, suisse,
                            belgique, angleterre,
                            colombie, japon
                        ]
                        _.each(roundOfSixteen, function(id, idx) {
                            before8(id, idx);
                        });
                    }
                });
            });
            /* Phase de poules */
            // do nothing
            /* Phase finale */
            $('#montrer-phase-finale').click()
        }, 500);
    });


    var getTeamFor = function(roundIdx, matchIdx, teamIdx) {
        var group = $scope.palmares[roundIdx][matchIdx][teamIdx].group,
            order = $scope.palmares[roundIdx][matchIdx][teamIdx].order;
        return _.find($scope.groups[group], { order : order });
    };

    var emptyPalmaresFrom = function(roundIdx, matchIdx, teamIdx) {
        var mapping = [matchIdx, teamIdx];
        for (var i = 1; $scope.palmares[roundIdx + i]; ++i) {
            mapping = $scope.mapping[roundIdx + (i - 1)][mapping[0]][mapping[1]];
            $scope.palmares[roundIdx + i][mapping[0]][mapping[1]].group = '';
            $scope.palmares[roundIdx + i][mapping[0]][mapping[1]].order = -1;
        }
    };

    var getPalmaresString = function() {
        var palmaresString = [];
        _.each($scope.palmares, function(round, roundIdx) {
            _.each(round, function(match, matchIdx) {
                _.each(match, function(team, teamIdx) {
                    var _team = getTeamFor(roundIdx, matchIdx, teamIdx);
                    if (_team != null) {
                        palmaresString.push(_team.id);
                    } else {
                        return '';
                    }
                });
            });
        });
        return palmaresString.join(';');
    };

    /*
    ** Scope functions
    */
    $scope.getWinnerGroup = function (group, order) {
        var team = _.find($scope.groups[group], { order : order });
        return team == null ? '' : team.country;
    };

    $scope.getSup = function (i) {
        return i === 0 ? 'er' : 'e';
    }

    $scope.goNext = function () {
        if (getTeamFor(0, 0, 0) != null && getTeamFor(0, 0, 1) != null && getTeamFor(0, 1, 0) != null && getTeamFor(0, 1, 1) != null && getTeamFor(0, 2, 0) != null && getTeamFor(0, 2, 1) != null && getTeamFor(0, 3, 0) != null && getTeamFor(0, 3, 1) != null && getTeamFor(0, 4, 0) != null && getTeamFor(0, 4, 1) != null && getTeamFor(0, 5, 0) != null && getTeamFor(0, 5, 1) != null && getTeamFor(0, 6, 0) != null && getTeamFor(0, 6, 1) != null && getTeamFor(0, 7, 0) != null && getTeamFor(0, 7, 1) != null) {
            $scope.empty = false;
            $scope.isNext = true;
        } else $scope.empty = true;
    }

    $scope.selectWinner = function(roundIdx, matchIdx, teamIdx) {
        var team = getTeamFor(roundIdx, matchIdx, teamIdx);

        if (team != null && $scope.palmares[roundIdx + 1] != null) {
            emptyPalmaresFrom(roundIdx, matchIdx, teamIdx);
            var mapping = $scope.mapping[roundIdx][matchIdx][teamIdx];
            $scope.palmares[roundIdx + 1][mapping[0]][mapping[1]].group = team.group;
            $scope.palmares[roundIdx + 1][mapping[0]][mapping[1]].order = team.order;
        }
    };

    $scope.getCountryName = function(roundIdx, matchIdx, teamIdx, small) {
        var team = getTeamFor(roundIdx, matchIdx, teamIdx);
        return team == null
            ? ''
            : (roundIdx < 1 ? team.initials :
                            small && roundIdx < 2 ? team.initials
                                     : !small && roundIdx < 2 ? team.country
                                                    : roundIdx < 3 ? team.country
                                                                   : team.fullcountry);
    };

    $scope.getFullName = function(roundIdx, matchIdx, teamIdx) {
        var team = getTeamFor(roundIdx, matchIdx, teamIdx);
        return team == null
            ? ''
            : roundIdx < 1 ? team.fullcountry
                : '';
    }

    $scope.export = function() {
        var data = [];
        _.each($scope.palmares, function(round, roundIdx) {
            data[roundIdx] = [];
            _.each(round, function(match, matchIdx) {
                _.each(match, function(team, teamIdx) {
                    data[roundIdx].push(getTeamFor(roundIdx, matchIdx, teamIdx));
                });
            });
        });
        window.exportImage(data);
    };

    $scope.tweet = function() {
        var url = encodeURIComponent(window.location.origin + window.location.pathname + '?p=' + getPalmaresString());
        var text = encodeURIComponent('Qui voyez-vous remporter la Coupe du monde de foot ?' + ' Faites vos pronostics avec l\'application Libé !');
        if (getTeamFor(3, 0, 0) != null) {
            text = encodeURIComponent('Mon pronostic pour la Coupe du monde de foot ? ' + getTeamFor(4, 0, 0).country + ' vainqueur ! Et vous ?');
        }

        window.open('https://twitter.com/intent/tweet?original_referer=' + '' + '&text=' + text + ' ' + url + ' via @libe', '', 'width=575,height=400,menubar=no,toolbar=no');
    };

    $scope.shareOnFacebook = function() {
        var url = encodeURIComponent(window.location.origin + window.location.pathname + '?p=' + getPalmaresString());

        window.open('http://www.facebook.com/sharer/sharer.php?u=' + url, '', 'width=575,height=400,menubar=no,toolbar=no');
    };

    $scope.refresh = function() {
        window.location.search = '';
        window.setTimeout(function() {
            window.location.reload();
        }, 100);
    };

    /*
    ** Scope class functions
    */
    $scope.showNext = function() {
        return $scope.isNext ? '' : 'hidden-sm hidden-xs';
    }

    $scope.getRoundClass = (function() {
        var rounds = ['eighthfinals', 'quarterfinals', 'semifinals', 'final', 'winner'];
        return function(idx) {
            return rounds[idx];
        };
    })();

    $scope.getMatchClass = (function() {
        var classes = ['col-xs-3 hidden-sm hidden-xs', 'col-xs-6', 'col-xs-12', 'col-xs-24', 'col-xs-24 col-xs-offset-6'];
        return function(idx) {
            return classes[idx];
        };
    })();

    /*
    ** Scope style function
    */
    $scope.getOpacityFor = function(team) {
        return {
            opacity: team.order === -1 ? 1 : 0.3
        };
    };

    $scope.getPronosticStyle = function(group, order) {
        var team = _.find($scope.groups[group], { order : order });
        return {
            'background-color' : team == null ? '#E6E6E6' : team.color,
            'color' : team == null ? '#F4F4F4' : team.textColor
        };
    };

    $scope.getTeamStyle = function(roundIdx, matchIdx, teamIdx) {
        var team = getTeamFor(roundIdx, matchIdx, teamIdx);

        return {
            'background-color' : team == null ? '#E6E6E6' : team.color,
            'color' : team == null ? '' : team.textColor,
            'border-right' : teamIdx > 0 ? 'none' : '1px solid #fff',
            'border-left' : teamIdx > 0 ? '1px solid #fff' : 'none'
        };
    };

    $scope.getArrowStyle = function(roundIdx, matchIdx, teamIdx) {
        if (roundIdx > 3) { return { display : 'none' }; }
        if ($scope.palmares[roundIdx + 1] == null) { return { color : '#E6E6E6' }; }

        var team = getTeamFor(roundIdx, matchIdx, teamIdx),
            mapping = $scope.mapping[roundIdx][matchIdx][teamIdx],
            nextTeam = getTeamFor(roundIdx + 1, mapping[0], mapping[1]);

        if (team != null && nextTeam != null && team.slug === nextTeam.slug) {
            return { color : team.color };
        }
        return { color : '#E6E6E6' };
    };

    /*
    ** Dragular
    */
    $scope.dragularOptions = {
        copy : true,
        canBeAccepted : function(el, target, source) {
            if (!$scope.locked) {
                if ($(target).hasClass('group__pronostic')) {
                    if ($(source).attr('x-group') === $(target).attr('x-group')) {
                        return true;
                    }
                }
            }
            return false;
        },
        scope : $scope
    };

    $scope.dragularDropOptions = {
        canBeAccepted : function() { return false; }
    };

    $scope.$on('dragulardrop', function(event, el, container, source) {
        var group = $(container).attr('x-group');
        // Make sure we didn't use the same country twice
        $(container).siblings().each(function() {
            $(this).children().each(function() {
                if ($(this).find('span').text() === $(el).find('span').text()) {
                    $(this).remove();
                }
            });
        });

        // Make sure we only have one item in this container
        $(container).children().each(function(idx) {
            if (idx < $(container).children().length - 1) {
                $(this).remove();
            }
        });

        // Update our data
        $scope.$apply(function() {
            _.each($scope.groups[group], function(d) { d.order = -1; });
            $(container).parent().children().each(function(idx) {
                var country = $(this).find('span').text();
                var team = _.find($scope.groups[group], { country : country });
                if (team != null) {
                    if (team.order !== idx + 1) {
                        for (var i = 0; i < $scope.palmares[0].length; ++i) {
                            for (var j = 0; j < $scope.palmares[0][i].length; ++j) {
                                if ($scope.palmares[0][i][j].group === group && $scope.palmares[0][i][j].order === idx + 1) {
                                    emptyPalmaresFrom(0, i, j);
                                }
                            }
                        }
                        team.order = idx + 1;
                    }
                }
            });
        });
    });

    /*
    ** Select
    */
    $scope.selectEighth = ['', '', '', '', '', '', '', ''];

    $scope.onSelectEighthChange = function(i) {
        $scope.selectWinner(0,i,$scope.selectEighth[i]);
    };

    $scope.selectModels = {};
    _.each($scope.groups, function(group, groupname) {
        $scope.selectModels[groupname] = ['', ''];
    });

    $scope.onSelectChange = function(group, order) {
        var other = order > 0 ? 0 : 1;
        var team = _.find($scope.groups[group], { slug : $scope.selectModels[group][order] }),
            oldTeam = _.find($scope.groups[group], { order : order + 1 });

        if (oldTeam != null) {
            oldTeam.order = -1;
        }

        for (var i = 0; i < $scope.palmares[0].length; ++i) {
            for (var j = 0; j < $scope.palmares[0][i].length; ++j) {
                if ($scope.palmares[0][i][j].group === group &&
                    $scope.palmares[0][i][j].order === order + 1) {
                    emptyPalmaresFrom(0, i, j);
                }
            }
        }

        team.order = order + 1;
        if ($scope.selectModels[group][other] == $scope.selectModels[group][order]) {
            $scope.selectModels[group][other] = '';
        }
    };
}]);
