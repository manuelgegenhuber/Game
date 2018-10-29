define(['jasmine-boot', 'models/BaseObject'],
    function(jasmine, BaseObject) {
        'use strict';
        return describe("BaseObject", function() {
            let testBaseObject;

            beforeEach(function() {
                testBaseObject = new BaseObject("testId", "testParentId", 100, 100, ["constructorClass"]);
            });

            /**
             * SUCCESS
             */

            //[1]
            it("CREATED -> width : 100 | height : 100 | elementId : testId | parentId : testParentId | cssClasses : ['constructorClass'] | x : 0 | y: 0", function() {
                expect(testBaseObject.elementId).toBe("testId");
                expect(testBaseObject.parentId).toBe("testParentId");
                expect(testBaseObject.width).toBe(100);
                expect(testBaseObject.height).toBe(100);
                expect(testBaseObject.x).toBe(0);
                expect(testBaseObject.y).toBe(0);
                expect(testBaseObject.cssClasses[0]).toBe("constructorClass");
            });

            //[2]
            it("SET -> width : 50 | height : 150 | cssClasses : ['setClass']", function() {
                //elementId and parentId can only be set via Constructor
                expect(testBaseObject.elementId).toBe("testId");
                expect(testBaseObject.parentId).toBe("testParentId");

                expect(testBaseObject.width = 50).toBe(50);
                expect(testBaseObject.height = 150).toBe(150);
                expect((testBaseObject.cssClasses = ["setClass"])[0]).toBe("setClass");
            });

            //[3]
            it("ADD -> cssClasses: 'second' , ['third', 'fourth'], 'fifth', 'sixth'", function() {
                expect(testBaseObject.addCssClass('second', ['third', 'fourth'], 'fifth').cssClasses.length).toBe(5);

                //ignore duplicates -> only addaed sixth
                expect(testBaseObject.addCssClass('second', ['third', 'fourth'], 'fifth', 'sixth').cssClasses.length).toBe(6);
            });

            //[4]
            it("ADD -> cssClasses: 'second' , ['third', ['fourth', ['fifth', 'sixth']]], 'seventh'", function() {

                //ignore duplicates -> only addaed sixth
                expect(testBaseObject.addCssClass('second', ['third', ['fourth', ['fifth', 'sixth']]], 'seventh').cssClasses.length).toBe(7);
            });

            //[5]
            it("DELETE -> cssClasses: 'second' , ['one', 'fourth'], 'four' ", function() {

                //delete values: 'one','four'
                // + 'constructorClass'
                expect(testBaseObject.addCssClass(['one', 'two', 'three', 'four']).deleteCssClass('second', ['one', 'fourth'], 'four').cssClasses.length).toBe(3);
            });

            //[6]
            it("SET -> x: 13 | y: 81", function() {
                expect(testBaseObject.x = 13).toBe(13);
                expect(testBaseObject.y = 81).toBe(81);
            });

            /**
             * FAIL
             */

            //[1]
            it("ERROR SET -> elementId: 'newId' | parentId:'newParentId'", function() {
                expect(() => testBaseObject.elementId = "newId").toThrow();
                expect(() => testBaseObject.parentId = "newParentId").toThrow();
            });

            //[2] 
            it("ERROR SET -> width: '50px' | height:'50px' | width: -8 | height: -55", function() {
                expect(() => testBaseObject.width = "50px").toThrow();
                expect(() => testBaseObject.height = "50px").toThrow();
                expect(() => testBaseObject.width = -8).toThrow();
                expect(() => testBaseObject.height = -55).toThrow();
            });

            //[3] 
            it("ERROR SET -> cssClasses: 'newClass' | cssClasses: ['newClass', 5]", function() {
                expect(() => testBaseObject.cssClasses = "newClass").toThrow();
                expect(() => testBaseObject.cssClasses = ["newClass", 5]).toThrow();
            });

            //[4]
            it("ERROR ADD -> addCssClass: 5 | cssClasses: ['newClass', 5]", function() {
                expect(() => testBaseObject.addCssClass(5)).toThrow();
                expect(() => testBaseObject.addCssClass(["newClass", 5])).toThrow();
            });

            //[5]
            it("ERROR SET -> x: 137 | y: 999 | x: -137 | y: -999 | x: '42' | y: 'text'", function() {
                expect(() => testBaseObject.x = 137).toThrow();
                expect(() => testBaseObject.y = 999).toThrow();
                expect(() => testBaseObject.x = -137).toThrow();
                expect(() => testBaseObject.y = -999).toThrow();
                expect(() => testBaseObject.x = '42').toThrow();
                expect(() => testBaseObject.y = 'text').toThrow();
            });
        });
    });