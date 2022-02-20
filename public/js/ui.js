var age = age || {};

$(function () {
    var resetViewport = function () {
        try {
            var minWidth = 375;
            var scale = 1;
            if (screen.width < minWidth) {
                scale = screen.width / minWidth;
            }

            var mvp = document.getElementById('meta-viewport');
            mvp.setAttribute('content', 'width=device-width, user-scalable=no, initial-scale=' + scale + ', maximum-scale=' + scale);
        }
        catch (e) { }
    }

    window.onload = resetViewport;
    window.onresize = resetViewport;
    resetViewport();

    var isMobil = false; //initiate as false
    // device detection
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
        isMobil = true;
    }

    function msieversion() {
        var msie = window.navigator.userAgent.indexOf("MSIE ");
        return (msie > -1 || !!navigator.userAgent.match(/Trident.*rv\:11\./))  // If Internet Explorer, return version number
    }

    // polyfill na max scroll values
    (function (elmProto) {
        if ('scrollTopMax' in elmProto) {
            return;
        }
        Object.defineProperties(elmProto, {
            'scrollTopMax': {
                get: function scrollTopMax() {
                    return this.scrollHeight - this.clientHeight;
                }
            },
            'scrollLeftMax': {
                get: function scrollLeftMax() {
                    return this.scrollWidth - this.clientWidth;
                }
            }
        });
    }
    )(Element.prototype);

    var isMobile = !msieversion();
    var initialProject = null;
    document.addEventListener('wheel', this.onMouseWheel, { passive: false });

    window.addEventListener("scroll", onWindowScroll);
    function onWindowScroll() {
        var pivotSelector = $(window);
        var scrollVal = pivotSelector.scrollTop();
        var pivotVal = $('#section-projects h1').offset().top;
        var isHeaderNear = Math.abs(scrollVal - pivotVal) < 70;
        $('#section-projects').toggleClass('with-header', isHeaderNear);
    }

    $('#projectsNav').click(function () {
        //pokud jsme v sekci projekty a uživatel klikne v menu na projekty, tak ho navedeme na začátek/list projektů
        if ($("#section-projects").hasClass('active'))
            fullPageMainPage.moveTo('projects', 0);

        $("#section-projects .fp-scrollable").css('transform', 'translate(0px, 0px)');
    });

    $('#menu a').click(function() {
        var sectionName = $(this).parent().data('menuanchor');
        if(!age.isFullpage) {
            age.hideProjectDetail();
            showFullpage();
            $(document).scrollTop(age.scrollTop);
            if(sectionName == 'projects') {
                return;
            }
            setTimeout(function() {
                fullPageMainPage.moveTo(sectionName);
            }, 150);
            
        }
    });

    $('#logoPh').click(function() {
        if(!age.isFullpage) {
            age.hideProjectDetail();
            showFullpage();
        }
        setTimeout(function() {
            fullPageMainPage.moveTo('home');
        }, 150);
    });

    jQuery.getScript('https://maps.googleapis.com/maps/api/js?sensor=false&key=AIzaSyBSERrQ7rP_Wn3CmfZAHIFdWxZ-BXCp25k');

    var progressTable = {};
    var progressEleWidth = 0;
    var progressBarTimer = null;

    function progressSum() {
        var sum = 0;
        for (var source in progressTable) {
            var sourceData = progressTable[source];
            sum += Math.round(sourceData.progress / 100.0 * sourceData.portion);
        }
        return sum;
    }

    function progressBar(progress, portion, source) {
        progressTable[source] = { progress: progress, portion: portion };

        function progressBarUpdate() {
            var width = progressSum();

            if (progressEleWidth >= 100)
                hideProgress();

            if (width <= progressEleWidth)
                return;

            var elem = document.getElementById("logo1Ph");
            elem.style.width = (progressEleWidth++) + '%';
            progressBarTimer = setTimeout(progressBarUpdate, 10);
        }

        clearTimeout(progressBarTimer);
        progressBarUpdate();
    }
    age.progressBar = progressBar;

    var fullPageMainPage = null;
    var anchors = ['home', 'projects', 'atelier', 'media', 'career', 'contacts'];
    function initFullpage(startSection, startIndex) {
        if (startSection) {
            $(".sections").removeClass('active');
            $("#" + startSection).addClass('active');

            if (startIndex) {
                $('.slide').removeClass('active');
                $("#" + startSection).find('.slide').eq(startIndex).addClass('active');
            }
        }
        
        age.isFullpage = true;
        return new fullpage('#fullpage', {
            //#9db667
            //#b8d555
            licenseKey: 'FBC71F56-EC2B42A6-84BF5E79-B04FE81C',
            paralaxKey: '3FB6DAF9-3FBA4470-947C5F29-553D087F',
            sectionsColor: ['#000000', '#000000', '#000000', '#000000', '#000000', '#000000'],
            anchors: [],//anchors,
            lockAnchors: false,
            autoScrolling: false,
            menu: '#menu',
            scrollOverflow: false,
            css3: false,
            scrollingSpeed: 700,
            fitToSection: true,
            fitToSectionDelay: 500,
            scrollBar: false,
            easing: 'easeInOutCubic',
            easingcss3: 'ease',
            verticalCentered: false,
            loopHorizontal: false,
            parallax: false,
            parallaxOptions: {
                type: 'reveal',
                percentage: 62,
                property: 'translate'
            },

            onLeave: function (origin, destination, direction) {
                if (destination.index == 5)
                    setTimeout(age.initMap, 500);
            },
            afterRender: function () {
            },
            afterLoad: function (fromSlide, toSlide) {
                window.currentIndex = toSlide.index;
            }
        });
    }
    function hideFullpage() {
        $('#fullpageWrapper').css('display', 'none');
        if(fullPageMainPage)
            fullPageMainPage.destroy('all');
        age.isFullpage = false;
    }

    function showFullpage() {
        $('#fullpageWrapper').css('display', 'block');
        fullPageMainPage = initFullpage();
        
        age.isFullpage = true;
    }

    function rebuildFullpage(startSection, startIndex) {
        fullPageMainPage.reBuild();
    }

    var progressHidden = false;
    
    function hideProgress() {
        if (progressHidden)
            return;
        progressHidden = true;

        var loader = $('#loaderPh');
        var logoPh = $('#logoPh');
        var loaderPosition = loader.offset();
        var logoPosition = logoPh.offset();
        loader.css({
            'margin-left': 0,
            'margin-top': 0,
            'left': loaderPosition.left+'px',
            'top': loaderPosition.top + 'px',
            'transition': 'transform 700ms',
            'transform': 'translate(0,0)'
        });

        var translateX = (loaderPosition.left - (logoPosition.left + 4));
        var translateY = (loaderPosition.top - (logoPosition.top + 4));
        translateX = (translateX < 0) ? 0 : translateX;
        translateY = translateY < 0 ? 0 : translateY;

        var transform = 'translate(-' + translateX + 'px,-' + translateY + 'px)';
        loader.css({'transform': transform});
        age.renderWebsiteContent();
        setTimeout(function () {
            //zkusíme provést iniciální navigaci v případě, že url stránky při vstupu obsahuje hash sekce/slidu
            var activeSectionId = '';
            var projectId = 0;
            if (location.hash && location.hash.indexOf) {
                for(var i = 0; i < anchors.length; i++) {
                    if (location.hash.indexOf('#' + anchors[i]) === 0)
                        activeSectionId = anchors[i];
                }
                if (!activeSectionId) {
                    var projectIdStr = location.hash.substring(1);
                    if(!isNaN(projectIdStr))
                        projectId = parseInt(projectIdStr);
                    else 
                        activeSectionId = 'home';
                }
            }
            else {
                activeSectionId = 'home';
            }
            
            $('#content').fadeIn(750, function () {
                loader.remove();
                if(activeSectionId) {
                    showFullpage();
                    fullPageMainPage.moveTo(activeSectionId);
                } else {
                    loadProjectDetail(projectId);
                }
            });
        }, 700);
    }

    progressBar(100, 0, 'page');
    age.loadWebsiteData();
    
    $.jsonp({
        url: 'http://ageproject.radekmlada.com/handler/bgimages?js=true',
        dataType: 'jsonp',
        crossDomain: true,
        callback: 'initBgImages',
        timeout: 60000,
        success:
            function (pages) {
                progressBar(100, 20, 'bgimages');
                //inicializujeme slidy pro homepage
                initBgImages(pages[0], $('#section0'), 'home', 15);
            },

        error: function () {
            var that = this;
            setTimeout(function () {
                $.jsonp(that);
            }, 1000);
        }
    });

    function loadImage(url) {
        return $.Deferred(function (task) {
            var image = new Image();
            image.onload = function () { task.resolve(image); };
            image.onerror = function () { task.reject(); };
            image.src = url;
        }).promise();
    }

    function carouselLoader(container, size, color, skipFadeIn) {
        if(!container)
            return;
        if (container.find('.sk-cube-grid').length)
            return;

        if (container.css('position') != 'absolute')
            container.css('position', 'relative');

        if (!size) {
            var containerWidth = container.width();
            var containerHeight = container.height();
            var sizeX = containerWidth / 5;
            var sizeY = containerHeight / 5;
            size = sizeX > sizeY ? sizeX : sizeY;
        }
        var halfSize = Math.round(size / 2);

        var ele = $('<div class="sk-cube-grid">'+
            '<div class="sk-cube sk-cube1"></div>'+
            '<div class="sk-cube sk-cube2"></div>'+
            '<div class="sk-cube sk-cube3"></div>'+
            '<div class="sk-cube sk-cube4"></div>'+
            '<div class="sk-cube sk-cube5"></div>'+
            '<div class="sk-cube sk-cube6"></div>'+
            '<div class="sk-cube sk-cube7"></div>'+
            '<div class="sk-cube sk-cube8"></div>'+
            '<div class="sk-cube sk-cube9"></div>'+
        '</div>');
        ele.css('width', size).css('height', size).css('margin-left', -halfSize).css('margin-top', -halfSize).hide();
        container.append(ele);
        if (skipFadeIn === true)
            ele.show();
        else
            ele.fadeIn(200);
    }

    function carouselLoaderEnd(container) {
        if(!container)
            return;
        container.find('.sk-cube-grid').remove();
    }

    function initBgImages(page, bgContainer, sectionName, progressForFirstImage) {
        $.each(page.list, function (i, image) {
            var addInfo = "";
            if (image.actionTitle && image.actionUrl) {
                addInfo = '<a href="' + image.actionUrl + '">' +
                    '<span class="row2"><span>' + image.actionTitle + '</span></span>' +
                    '<span class="row1"><span class="fas fa-' + image.actionIcon + '"></span></span>' +
                    '</a >';
            }

            var background = $('<div class="slide slide' + i + '">' +
                '<div class="fill"></div>' +
                '<div class="news-list page-label">' + 
                addInfo +
                '</div>' +
                '<div class="page-label page-label-extended image-caption-' + sectionName + '"><a class="link"><span class="row2"><span>' + image.title + '</span></span><span class="row1"><i class="fas fa-chevron-right"></i></span></a>' +
                '</div></div>');
            
            var link = background.find('.link');
            link.click(function() {
                alert('go to project detail');
            });

            background.find('.fill').css('background-image', 'url(http://ageproject.radekmlada.com' + image.url + ')');
            if (i == 0) {
                background.addClass('active');
            }

            bgContainer.append(background);
        });

        var firstPictureUrl = 'http://ageproject.radekmlada.com' + page.list[0].url;
        loadImage(firstPictureUrl).done(function () {
            progressBar(100, progressForFirstImage, 'firstImage'+sectionName);
        });
    }

    function carouselLeft(e) {
        var nextItem = $('.section.active .carousel-indicators li.active').prev();
        if (nextItem.length === 0)
            return;

        nextItem.trigger('click', e);
        console.log('left swipe');
    }

    function carouselRight(e) {
        var nextItem = $('.section.active .carousel-indicators li.active').next();
        if (nextItem.length === 0)
            return;

        nextItem.trigger('click', e);
        console.log('right swipe');
    }

    //var $el = $('#projectListSlide');
    //Hammer($el[0]).on("dragstart", function (e) {
    //    $el.stop().data('dragstart', $el[0].scrollTop).css('cursor', '-webkit-grabbing');
    //});
    //Hammer($el[0]).on("drag", function (e) {
    //    $el[0].scrollTop = $el.data('dragstart') - e.gesture.deltaY;
    //});
    //Hammer($el[0]).on("dragend", function (e) {
    //    $el.css('cursor', '-webkit-grab');
    //    var verse = e.gesture.deltaY < 0 ? 1 : -1;
    //    var cur = $el[0].scrollTop;
    //    $el.stop().animate({
    //        scrollTop: cur + verse * e.gesture.velocityY * 300
    //    }, {
    //            easing: 'easeOutExpo',
    //            duration: 2000
    //        });
    //});

    $('.navbar-toggle').click(function() {
        $('.navbar-collapse').toggleClass('in');
    });

    $("#leftCarousel").click(carouselLeft);
    $("#rightCarousel").click(carouselRight);

    var projectItems = null;
    var projectFilters = null;
    var currentProjectFilter = {}
    $.jsonp({
        url: 'http://ageproject.radekmlada.com/handler/projectFilter?js=true',
        dataType: 'jsonp',
        crossDomain: true,
        callback: 'initFilters',
        timeout: 60000,
        success:
            function (filters) {
                progressBar(100, 10, 'projectFilter');

                projectFilters = filters;

                var container = $('#filterContainer');
                var index = 0;
                var initItem = function (name, filterItems, filterId) {
                    var section = $("<section><h3>" + name + "</h3><ul></ul></section>");
                    var items = section.find("ul");
                    container.append(section);

                    $.each(filterItems, function (i, item) {
                        var elementId = "projectFilter" + index++;
                        var itemElement = $("<li id='" + elementId + "'>" + item.Name + "</li>");
                        item.selected = false;
                        item.elementId = '#' + elementId;
                        itemElement.click(function () {  filterProjectItem(item, filterId); });
                        items.append(itemElement);
                    });
                }

                initItem("Konstrukce", filters.constructions, "constructionId");
                initItem("Typy", filters.types, "typeId");
                initItem("Fáze", filters.phases, "phaseId");
                initItem("Roky", filters.years, "yearsId");

                $('#filterContainer .button-reset').click(function () {
                    return false;
                    $('#filterContainer .button-reset-all').toggleClass('selected', false);
                    $(this).toggleClass('selected',true);
                    
                    for (var filterId in currentProjectFilter) {
                        var currentProjectItem = currentProjectFilter[filterId];
                        if (currentProjectItem) {
                            $(currentProjectItem.elementId).toggleClass("selected", false);
                            currentProjectFilter[filterId] = null;
                        }
                    }

                    clearProjectItems();
                    $.each(projectItems.list, function (i, projectItem) {
                        if (projectItem.isPreview == 1)
                            initProjectItem(i, projectItem);
                    });
                    rebuildFullpage();
                });

                $('#filterContainer .button-reset-all').click(function () {
                    return false;
                    $('#filterContainer .button-reset').toggleClass('selected', false);
                    $(this).toggleClass('selected', true);

                    for (var filterId in currentProjectFilter) {
                        var currentProjectItem = currentProjectFilter[filterId];
                        if (currentProjectItem) {
                            $(currentProjectItem.elementId).toggleClass("selected", false);
                            currentProjectFilter[filterId] = null;
                        }
                    }

                    clearProjectItems();
                    $.each(projectItems.list, function (i, projectItem) {
                        initProjectItem(i, projectItem);
                    });
                    rebuildFullpage();
                });

                $('#project-filters-toggle').click(function (e) {
                    return false;
                    $('#projectListSlide').toggleClass('filterClosed');
                    setTimeout(function () { rebuildFullpage(); }, 1100);
                });
            },

        error: function () {
            var that = this;
            setTimeout(function () {
                $.jsonp(that);
            }, 1000);
        }
    });

    var clearProjectItems = function () {
        var container = $('#projectListContainer');
        container.html('');
    }

    function toggleProjectDrawer(expand) {
        var detailSelector = $('#project-detail-container');
        var toggleFilterSelector = $('#project-filters-toggle');
        var containerSelector = $('#download');
        var pivotSelector = $(window);
        var difference = Math.round(pivotSelector.scrollTop() - containerSelector.offset().top);
        var maxDifference = (containerSelector.height() - pivotSelector.height());


        if (difference > 0) {
            detailSelector.css('margin-top', difference + "px").css('position', '');
            toggleFilterSelector.css('position', 'absolute').css('top', ((difference < maxDifference ? difference : maxDifference) + window.projectFilterToggleTop) + "px").css('right', 0);
        }

        var wWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0, $(window).width());
        $('#project-drawer').stop().animate({
            scrollLeft: expand ? wWidth : 0
        }, 1000, 'easeInOutExpo', function () {
            detailSelector.data('active', expand);
            toggleFilterSelector.data('active', !expand);
            if (difference > 0) {
                detailSelector.css('margin-top', '');
            }
            if (!expand)
                toggleFilterSelector.css('position', '').css('top', window.projectFilterToggleTop + 'px').css('right', "");
            resizeUI();
        });
    }

    window.toggleProjectDrawer = toggleProjectDrawer;

    //klik na tlačítko projekty vrátí uživatele zpět na seznam projektů
    $("#project-detail-container .project-back-button").click(function () {
        if ($("#project-detail-container").data('active'))
            toggleProjectDrawer(false);
    });

    $("#project-detail-content .glyphicon-remove").click(function () {
        $(".projectDescription").toggle(500);
        $(this).hide();
        $("#project-detail-content .glyphicon-chevron-down").show();
    });

    $("#project-detail-content .glyphicon-chevron-down").click(function () {
        $(".projectDescription").toggle(500);
        $(this).hide();
        $("#project-detail-content .glyphicon-remove").show();
    });

    function projectCarouselLeft(e) {
        var nextItem = $('#project-carousel li.active').prev();
        if (nextItem.length == 0) {
            toggleProjectDrawer(false);
            return;
        }
        if(e && e.preventDefault)
            e.preventDefault();
        nextItem.trigger('click', e);
    }
    function projectCarouselRight(e) {
        var nextItem = $('#project-carousel li.active').next();
        if (e && e.preventDefault)
            e.preventDefault();
        if(nextItem.length>0)
            nextItem.trigger('click', e);
    }

    $("#projectCarouselLeft").click(projectCarouselLeft);
    $("#projectCarouselRight").click(projectCarouselRight);

    //swipe left vrátí uživatele z detailu projektu na seznam projektů
    //var projectHammertimeEnabled = true;
    //var projectHammertime = new Hammer($("#project-detail-container")[0]);
    //projectHammertime.on('swipe', function (e) {
    //    if (!projectHammertimeEnabled) return;
    //    if (e.direction == 2) { //left
    //        projectCarouselRight();
    //        projectHammertimeEnabled = false;
    //    } else if (e.direction == 4) {
    //        if ($('#project-carousel li.active').data('slide-to') == 0 && $("#project-detail-container").data('active')) {
    //            toggleProjectDrawer(false);
    //        } else {
    //            projectCarouselLeft();
    //        }
    //        projectHammertimeEnabled = false;
    //    }
    //    if (!projectHammertimeEnabled) {
    //        setTimeout(function () { projectHammertimeEnabled = true; }, 100);
    //    }
    //});

    var projectLoader = null;
    var initProjectItem = function (i, projectItem, priority) {
        var container = $('#projectListContainer');
        
        var item = "<a data-project-item-id='" + projectItem.id + "' class='projectItem"+((projectItem.previewId<0)?"empty":"")+"'><h3>" + projectItem.shortName + "</h3>";
        var url = (projectItem.previewId <0) ? "images/house.png" : "http://ageproject.radekmlada.com/images/project/image_" +
            projectItem.id + '_' + projectItem.previewId + "_preview.jpg";
        //<img src='"+url+"' />
        item += "</a>";
        projectItem.element = item = $(item);
        item.css('backgroundImage', 'url(' + url + ')');
        if(priority)
            item.addClass('initial');
        projectItem.previewUrl = url;
        item.click(function (evnt, slideIndex) {
            if (window.isMoving)
                return;
            if (projectLoader) {
                projectLoader.abort();
            }
            projectLoader = loadProjectDetail(projectItem.id, projectItem.element, function() { projectLoader = null; });
        });

        if(priority) {
            container.prepend(item);
        }
        else {
            container.append(item);
        }

        return item;
    }

    function filterProjectItems() {
        return;
        clearProjectItems();
        $('#filterContainer .button-reset, #filterContainer .button-reset-all').toggleClass('selected', false);
        var counter = 0;
        $.each(projectItems.list, function (i, projectItem) {
            var pass = true;
            for (var filterId2 in currentProjectFilter) {
                if (currentProjectFilter[filterId2] && projectItem.filterSettings[filterId2] != currentProjectFilter[filterId2].id)
                    pass = false;
            }
            if (!pass) return;
            initProjectItem(i, projectItem);
            counter++;
        });
        setTimeout(function () {
            rebuildFullpage();
        }, 100);
    }

    function filterProjectItem(projectItem, filterId) {
        var currentProjectItem = currentProjectFilter[filterId];
        if (currentProjectItem) {
            $(currentProjectItem.elementId).toggleClass("selected", false);
            currentProjectFilter[filterId] = null;
        }
        if (currentProjectItem != projectItem) {
            currentProjectFilter[filterId] = projectItem;
            $(projectItem.elementId).toggleClass("selected", true);
        }
        filterProjectItems();
    }

    $.jsonp({
        url: 'http://ageproject.radekmlada.com/handler/projectPreviews?js=true',
        dataType: 'jsonp',
        crossDomain: true,
        callback: 'initProjects',
        timeout: 60000,
        success: function (data) {
            progressBar(100, 10, 'projectThumbnails');

            projectItems = data;
            projectItems.thumbnailUrl = 'http://ageproject.radekmlada.com' + data.thumbnailUrl + '?nocache=' + (new Date().getTime());

            $.each(projectItems.list, function(i, projectItem) {
                if(initialProject && initialProject.Id == projectItem.id) {
                    initialProject.DataItem = projectItem;
                    console.log(initialProject);
                    initProjectItem(i, projectItem, true);
                }
                else if(projectItem.isPreview == 1)
                    initProjectItem(i, projectItem);
            });
        },

        error: function (a, b, c) {
            var that = this;
            setTimeout(function () {
                $.jsonp(that);
            }, 1000);
        }
    });

    $.jsonp({
        url: 'http://ageproject.radekmlada.com/handler/flashConfig?js=true',
        dataType: 'jsonp',
        crossDomain: true,
        callback: 'initConfig',
        timeout: 60000,
        success:
            function (data) {
                $('#profil-text').html(data.ProfilText);
                //$('#map-text pre').html(data.MapText);
                progressBar(100, 10, 'flashConfig');
            },

        error: function () {
            var that = this;
            setTimeout(function () {
                $.jsonp(that);
            }, 1000);
        }
    });

    function showProjectImage(data, id, skipUrl) {
        id = id + 1;
        var container = $('#section-projects .slide'+id);
        var item = container.find('item');
        if (item.length == 0) {
            item = $('<div class="item">' +
                '<div class="bg-fill"></div>'+
                '<div class="fill" ' + (skipUrl ? '' : 'style="background-image:url(http://ageproject.radekmlada.com' + data.url + ')"') + '></div>' +
                //'<img class="fill" src="http://ageproject.radekmlada.com' + data.url + '"/>' +
                //((data.title) ? ('<h3 class="carousel-caption">'+data.title+'</h3>'):'')+
                '</div>');
            container.append(item);
        } 
        //$('.project-thumbnails .project-thumbnail').removeClass('active'); $('.project-thumbnails .thumbnail' + data.id).addClass('active');
    }

    function redrawSvg(container, img, id) {
        var wWidth = $(window).width();
        var wHeight = $(window).height();

        var scaleX = wWidth / img.width;
        var scaleY = wHeight / img.height;
        var scale = scaleX > scaleY ? scaleX : scaleY;
        var imageWidth = Math.round(img.width * scale);
        var imageHeight = Math.round(img.height * scale);
        var x = Math.round((wWidth - imageWidth) / 2);
        var y = Math.round((wHeight - imageHeight) / 2);
        var svg;

        //$('.slide:not(.active)').find('svg.svg-fullscreen').remove();
        container.find('svg').remove();
        container.each(function (i) {
            if(isMobile) {
                svg = $("<div style='width: 100%; height: 100%; background-size: cover; background-position: center; background-image:url(\"" + img.src + "\"); filter: blur(15px);'></div>");
            }
            else {
                svg = $('<svg class="svg-fullscreen" xmlns="http://www.w3.org/2000/svg"' +
                    'xmlns:xlink="http://www.w3.org/1999/xlink"' +
                    'width="' + wWidth + '" height="' + wHeight + '"' +
                    'viewBox="0 0 ' + wWidth + ' ' + wHeight + '">' +
                    '<filter id="blur' + id + '_'+i+'" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">' +
                    '<feGaussianBlur stdDeviation="15 15" edgeMode="duplicate" />' +
                        '<feColorMatrix type="saturate" values="0.5"/>'+
                    '<feComponentTransfer>' +
                    '<feFuncA type="discrete" tableValues="1 1" />' +
                    '</feComponentTransfer>' +
                    '</filter>' +
                    '<image filter="url(#blur' + id + '_' + i +')" ' +
                    'xlink:href="' + img.src + '"' +
                    'x="' + x + '" y="' + y + '"' +
                    'width="' + imageWidth + '" height="' + imageHeight + '"' +
                    'preserveAspectRatio="xMinYMin slice"/>' +
                    '</svg>');
                svg.data('redraw', redrawSvg);
            }
            
            $(this).append(svg)
        });

        return container;
    }

    function loadProjectDetail(projectId, carouselElement, complete) {
        carouselLoader(carouselElement, null, null, true);
        console.log('loading project detail started');

        var finish = function () {
            console.log('loading project detail finished');
            carouselLoaderEnd(carouselElement);
            if (complete) complete();
        }
        

        var result = $.jsonp({
            url: 'http://ageproject.radekmlada.com/handler/project/' + projectId + '?js=true',
            dataType: 'jsonp',
            crossDomain: true,
            callback: 'initProject',
            timeout: 60000,
            success:
            function (data) {
                if (result.aborted) {
                    finish();
                    return;
                }

                age.scrollTop = $(document).scrollTop();
                hideFullpage();
                age.showProjectDetail(data);
                finish();
                return;
            },
            error: function () {
                var that = this;
                setTimeout(function () {
                    $.jsonp(that);
                }, 1000);
            }
        });
        var baseAbort = result.abort;
        result.abort = function () {
            result.aborted = true;
            finish();
            baseAbort.call(this);
        }
        return result;
    }
});