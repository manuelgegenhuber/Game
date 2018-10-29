define(['jasmine-boot', 'models/Block'],
    function(jasmine, Block) {
        'use strict';

        describe("Block", function() {
            let testBlock;

            beforeEach(function() {
                testBlock = new Block();
            });

            /**
             * SUCCESS
             */

            //[1]
            it("CREATED -> points : 0 | strength : 1 | elementId : '' | parentId : '' | width : 10 | height : 10 | cssClasses : []", function() {
                expect(testBlock.elementId).toBe("");
                expect(testBlock.parentId).toBe("");
                expect(testBlock.width).toBe(10);
                expect(testBlock.height).toBe(10);
                expect(testBlock.cssClasses.length).toBe(0);
                expect(testBlock.points).toBe(0);
                expect(testBlock.strength).toBe(1);
            });

            //[2]
            it("SET -> points : 10 | strength : 5", function() {
                testBlock.points = 10;
                testBlock.strength = 5;

                expect(testBlock.points).toBe(10);
                expect(testBlock.strength).toBe(5);
            });

            //[3]
            it("CALL -> hasBeenHit() | strength : 7", function() {
                testBlock.strength = 7;
                testBlock.hasBeenHit();

                expect(testBlock.strength).toBe(6);
            });

            //[]
            it("CALL -> hasBeenHit() | strength : 1", function() {
                testBlock.strength = 1;

                expect(testBlock.hasBeenHit()).toBe(0);
            });

            /**
             * FAIL
             */

            //[1]
            it("ERROR SET -> points : '5' | points : -9 | strength : '3' | strength : -6", function() {
                expect(() => testBlock.points = "5").toThrow();
                expect(() => testBlock.strength = "3").toThrow();
                expect(() => testBlock.points = -9).toThrow();
                expect(() => testBlock.strength = -6).toThrow();
            });
        });
    });