/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('check urls', function () {
            for(feed of allFeeds){
                expect('url' in feed).toBe(true);
                expect(Boolean(feed['url'])).toBe(true);
            }
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('check names', function () {
            for(feed of allFeeds){
                expect('name' in feed).toBe(true);
                expect(Boolean(feed['name'])).toBe(true);
            }
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('RSS Feeds', function() {


        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('default menu hidden', function () {
            let menuLength = document.getElementsByClassName('menu-hidden').length;
            expect(menuLength).not.toBe(0)
            })

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('menu icon display/hidden', function () {
            document.getElementsByClassName('icon-list')[0].click()
            let menuLength = document.getElementsByClassName('menu-hidden').length;
            expect(menuLength).toBe(0);
            document.getElementsByClassName('icon-list')[0].click();
            menuLength = document.getElementsByClassName('menu-hidden').length;
            expect(menuLength).toBe(1)
            })
    });
    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function(){
        // 这样会报done is not defined，为什么？
        // beforeEach(loadFeed(0, done));
        beforeEach(function (done) {
            loadFeed(0, done);
        });
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it('ensures entry', function () {
            let entryLength = document.getElementsByClassName('feed')[0].getElementsByClassName('entry').length
            expect(entryLength).toBeGreaterThan(0);
            // 这里不执行done也可以，为什么？
            // done();
        })
    });
    /* TODO: Write a new test suite named "New Feed Selection" */
    // 此处参考 https://github.com/ConnersHua/Udacity-Feed-Reader-Testing/blob/master/jasmine/spec/feedreader.js
    describe('New Feed Selection', function() {
        beforeEach(function (done) {
            loadFeed(0, function () {
                // 为什么使用以下会变量定义方式，会报错preChangeTitle is not defined
                // var preChangeTitle = document.getElementsByClassName('header-title')[0].innerText;
                // let preChangeTitle = document.getElementsByClassName('header-title')[0].innerText;
                // const preChangeTitle = document.getElementsByClassName('header-title')[0].innerText;
                preChangeTitle = document.getElementsByClassName('header-title')[0].innerText;
                loadFeed(1, function () {
                    done()
                })
            });
        });
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        it('ensure change', function () {
            expect(preChangeTitle !== document.getElementsByClassName('header-title')[0].innerText).toBe(true)
            })
    });
}());
