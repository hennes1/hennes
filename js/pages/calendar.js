/**
 * Created by hennes on 2017/06/03.
 */
$(function () {
    //当前页
    Hennes.loadNav('../', 'header', 'side_nav3_2');

    /*
     自定义一个名为 "custom"的语言
     */

    $.dateRangePickerLanguages['custom'] = {
        'selected': 'Choosed:',
        'days': 'Days',
        'apply': 'Close',
        'week-1': 'Mon',
        'week-2': 'Tue',
        'week-3': 'Wed',
        'week-4': 'Thu',
        'week-5': 'Fri',
        'week-6': 'Sat',
        'week-7': 'Sun',
        'month-name': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        'shortcuts': 'Shortcuts',
        'past': 'Past',
        '7days': '7days',
        '14days': '14days',
        '30days': '30days',
        'previous': 'Previous',
        'prev-week': 'Week',
        'prev-month': 'Month',
        'prev-quarter': 'Quarter',
        'prev-year': 'Year',
        'less-than': 'Date range should longer than %d days',
        'more-than': 'Date range should less than %d days',
        'default-more': 'Please select a date range longer than %d days',
        'default-less': 'Please select a date range less than %d days',
        'default-range': 'Please select a date range between %d and %d days',
        'default-default': 'This is costom language'
    };

    var startDate = moment().startOf('day').format("YYYY-MM-DD"),//当天
        endDate = moment().day(24).format("YYYY-MM-DD"); //从现在开始的3周后

    $('#date_range0').dateRangePicker({})
        .bind('datepicker-first-date-selected', function (event, obj) {
            /* This event will be triggered when first date is selected */
            console.log('first-date-selected', obj);
            //obj will be something like this:
            // {
            // 		date1: (Date object of the earlier date)
            //}
        })
        .bind('datepicker-change', function (event, obj) {
            var dateRange = obj.value.split(' ~ ');
            /* This event will be triggered when second date is selected */
            console.log('change', dateRange);
            // obj will be something like this:
            // {
            // 		date1: (Date object of the earlier date),
            // 		date2: (Date object of the later date),
            //	 	value: "2013-06-05 to 2013-06-07"
            // }
        })
        .bind('datepicker-apply', function (event, obj) {
            var dateRange = obj.value.split(' ~ ');
            /* This event will be triggered when user clicks on the apply button */
            console.log('apply', dateRange);
        })
        .bind('datepicker-close', function () {
            /* This event will be triggered before date range picker close animation */
            console.log('before close');
        })
        .bind('datepicker-closed', function () {
            /* This event will be triggered after date range picker close animation */
            console.log('after close');
        })
        .bind('datepicker-open', function () {
            /* This event will be triggered before date range picker open animation */
            console.log('before open');
        })
        .bind('datepicker-opened', function () {
            /* This event will be triggered after date range picker open animation */
            console.log('after open');
        });

    $('#date_range1').dateRangePicker({
        startOfWeek: 'monday',
        separator: ' ~ ',
        format: 'DD.MM.YYYY HH:mm',
        autoClose: false,
        time: {
            enabled: true
        }
    });

    $('#date_range1_1').dateRangePicker({
        startOfWeek: 'monday',
        separator: ' ~ ',
        format: 'DD.MM.YYYY HH:mm',
        autoClose: false,
        time: {
            enabled: true
        },
        defaultTime: moment().startOf('day').toDate(),
        defaultEndTime: moment().endOf('day').toDate()
    });

    $('#date_range2').dateRangePicker();

    $('#date_range3').dateRangePicker({
        language: 'cn'
    });

    $('#date_range4').dateRangePicker({
        language: 'en'
    });

    $('#date_range105').dateRangePicker({
        showCustomValues: true,
        customValueLabel: 'Dynamic Ranges',
        customValues: [
            {
                name: 'MTD',
                value: 'Month To Date'
            },
            {
                name: 'YTD',
                value: 'Year To Date'
            }
        ]
    });

    $('#date_range100').dateRangePicker({
        shortcuts: null,
        startOfWeek: 'sunday',
        language: 'en',
        showShortcuts: true,
        customShortcuts: [
            //if return an array of two dates, it will select the date range between the two dates
            {
                name: 'this week',
                dates: function () {
                    var start = moment().day(0).toDate();
                    var end = moment().day(6).toDate();
                    // start.setDate(1);
                    // end.setDate(30);
                    return [start, end];
                }
            },
            //if only return an array of one date, it will display the month which containing the date. and it will not select any date range
            {
                name: 'Oct 2014',
                dates: function () {
                    //move calendars to show this date's month and next month
                    var movetodate = moment('2014-10', 'YYYY-MM').toDate();
                    return [movetodate];
                }
            }
        ]
    }).bind('datepicker-apply', function (event, obj) {
        console.log(obj);
    });

    $('#date_range101').dateRangePicker({
        showShortcuts: true,
        shortcuts: {
            'next-days': [3, 5, 7],
            'next': ['week', 'month', 'year']
        }
    });

    $('#date_range102').dateRangePicker({
        showShortcuts: true,
        shortcuts: {
            'prev-days': [3, 5, 7],
            'prev': ['week', 'month', 'year'],
            'next-days': null,
            'next': null
        }
    });

    var $dt103 = $('#date_range103');
    $dt103.dateRangePicker({
        autoClose: true
    });

    $('#date_range103_1').click(function (e) {
        e.stopPropagation();
        $dt103.data('dateRangePicker').open();
    });

    $('#date_range4_1').dateRangePicker({
        language: 'custom'
    });

    $('#date_range5').dateRangePicker({
        startDate: startDate
    });

    $('#date_range6').dateRangePicker({
        startDate: startDate,
        endDate: endDate
    });

    $('#date_range7').dateRangePicker({
        minDays: 3,
        maxDays: 7
    });

    $('#date_range8').dateRangePicker({
        startOfWeek: 'monday'
    });

    $('#date_range9').dateRangePicker({
        getValue: function () {
            return this.innerHTML;
        },
        setValue: function (s) {
            this.innerHTML = s;
        }
    });

    var $dt200 = $('#date_range200'), $dt201 = $('#date_range201');
    $('#two_inputs').dateRangePicker({
        separator: ' to ',
        getValue: function () {
            if ($dt200.val() && $dt201.val())
                return $dt200.val() + ' to ' + $dt201.val();
            else
                return '';
        },
        setValue: function (s, s1, s2) {
            $dt200.val(s1);
            $dt201.val(s2);
        }
    });

    $('#date_range5_2').dateRangePicker({
        minDays: 3,
        maxDays: 7
    });

    $('#date_range10').dateRangePicker({
        format: 'dddd MMM Do, YYYY'  //more formats at http://momentjs.com/docs/#/displaying/format/
    });

    var $dt12 = $('#date_range12');
    $dt12.dateRangePicker({
        inline: true,
        container: '#date-range12-container',
        alwaysOpen: true
    });

    $('#date_range12_1').click(function (e) {
        e.stopPropagation();
        $dt12.data('dateRangePicker').setDateRange(startDate, endDate);
    });
    $('#date_range12_2').click(function (e) {
        e.stopPropagation();
        $dt12.data('dateRangePicker').clear();
    });

    $('#date_range13').dateRangePicker({
        autoClose: true,
        singleDate: true,
        showShortcuts: false
    });

    $('#date_range13_1').dateRangePicker({
        singleMonth: true,
        showShortcuts: false,
        //singleDate: true,
        showTopbar: false
    });

    $('#date_range13_2').dateRangePicker({
        autoClose: true,
        singleDate: true,
        showShortcuts: false,
        singleMonth: true
    });

    $('#date_range14').dateRangePicker({
        batchMode: 'week',
        showShortcuts: false
    });

    $('#date_range16').dateRangePicker({
        selectForward: true
    });

    $('#date_range17').dateRangePicker({
        selectBackward: true
    });

    $('#date_range18').dateRangePicker({
        startDate: new Date(),
        selectForward: true,
        beforeShowDay: function(t) {
            var valid = !(t.getDay() == 0 || t.getDay() == 6);  //disable saturday and sunday
            var _class = '';
            var _tooltip = valid ? '' : '已售完';
            return [valid,_class,_tooltip];
        }
    });

    $('#date_range19').dateRangePicker({
        customOpenAnimation: function(cb) {
            $(this).fadeIn(300, cb);
        },
        customCloseAnimation: function(cb) {
            $(this).fadeOut(300, cb);
        }
    });

    $('#date_range20').dateRangePicker({
        customArrowPrevSymbol: '<i class="glyphicons glyphicons-arrow-left"></i>',
        customArrowNextSymbol: '<i class="glyphicons glyphicons-arrow-right"></i>'
    });

});