List.prototype.plugins.paging = function(locals, options) {
    var list = this;
    var init = function() {
        options = options || {};
        var topList = new List(list.listContainer.id, {
            listClass: options.pagingClass || 'pagingTop',
            item: "<li><div class='page'></div></li>",
            valueNames: ['page'],
            searchClass: 'nosearchclass',
            sortClass: 'nosortclass'
        });
        var bottomList = new List(list.listContainer.id, {
            listClass: options.pagingClass || 'pagingBottom',
            item: "<li><div class='page'></div></li>",
            valueNames: ['page'],
            searchClass: 'nosearchclass',
            sortClass: 'nosortclass'
        });
        list.on('updated', function() {
            refresh(topList);
            refresh(bottomList);
        });
        refresh(topList);
        refresh(bottomList);
    };

    var refresh = function(pagingList) {
        var l = list.matchingItems.length,
            index = list.i,
            page = list.page,
            pages = Math.ceil(l / page),
            currentPage = Math.ceil((index / page)),
            prev_class = (currentPage == 1) ? ' disabled' : '',
            next_class = (currentPage == pages) ? ' disabled' : '';

        pagingList.clear();

        var first = pagingList.add({
            page: '<a class="button grey no-ajax' + prev_class + '" href="javascript:void(0);">&laquo; First</a>'
        })[0].elm;
        var prev = pagingList.add({
            page: '<a class="button grey no-ajax' + prev_class + '" href="javascript:void(0);">&lsaquo; Previous</a>'
        })[0].elm;
        var pageNum = pagingList.add({
            page: "<span>" + currentPage + " of " + pages + "</span>"
        })[0].elm;
        var next = pagingList.add({
            page: '<a class="button grey no-ajax' + next_class + '" href="javascript:void(0);">Next &rsaquo;</a>'
        })[0].elm;
        var last = pagingList.add({
            page: '<a class="button grey no-ajax' + next_class + '" href="javascript:void(0);">Last &raquo;</a>'
        })[0].elm;

        if (!prev_class) {
            addEvent(first, 1, page);
            addEvent(prev, currentPage - 1, page);
        }
        if (!next_class) {
            addEvent(next, currentPage + 1, page);
            addEvent(last, pages, page);
        }
    };

    var addEvent = function(elm, i, page) {
         ListJsHelpers.addEvent(elm, 'click', function() {
             list.show((i-1)*page + 1, page);
         });
    };

    init();
    return this;
};
