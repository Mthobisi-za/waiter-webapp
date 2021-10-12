const factory = require("../factory js/factory-function")
const assert = require("assert")
describe("Factory function tests", function(){
    beforeEach(async  function(){
        await factory().reset();
    }); 
    it("shuld be able to return the arror message for entering wrong data to login screen", ()=>{
        const useFactory = factory();
        useFactory.getDataForWaiter("mhobisi2134");
        var error = "Please insert correct data with no numbers or space!";
        assert.equal(useFactory.getError(),error);
    });
    it("should be able to send the days picked by waiters", async function(){
        const useFactory = factory();
        var days = {day: ["Monday", "Tuesday", "Sunday"]};
        assert.equal( await useFactory.setData(days, "Mthobisi"), undefined);
    });
    it("should be able to get the days picked by waiter", async ()=>{
        const useFactory = factory();
        var data = await useFactory.getDataForWaiter("Mthobisi");
        var days =  [  'Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        assert.deepEqual(days, await data);
    }); 
    it("should be able to get the days of the week", async ()=>{
        const useFactory = factory();
        var data = await useFactory.getWeek();
        var days =  [{"id": 1,"the_day": "Sunday"},
              {"id": 2,"the_day": "Monday"},
              {"id": 3,"the_day": "Tuesday"},
              {"id": 4,"the_day": "Wednesday"},
              {"id": 5,"the_day": "Thursday"},
              {"id": 6,"the_day": "Friday"},
              {"id": 7,"the_day": "Saturday"}
             ];
        assert.deepEqual(days, await data);
    });
    it("should be able to get all days picked by waiters", async ()=>{
        const useFactory = factory();
        var days = {day: ["Monday", "Tuesday", "Sunday"]};
        useFactory.setData(days, "Mthobisi");
        useFactory.setData(days, "Sbahle");
        var data = useFactory.getWeekAndPickedDays();
        var actualD = 
        [{class: 'white',day: 'Sunday',number: 1},
          {class: 'white',day: 'Monday',number: 1},
          {class: 'white',day: 'Tuesday',number: 1},
          {class: 'white',day: 'Wednesday',number: 0},
          {class: 'white',day: 'Thursday',number: 0},
          {class: 'white',day: 'Friday',number: 0},
          {class: 'white',day: 'Saturday',number: 0}
        ]
        assert.deepEqual(await data, actualD);
    });
    it('should be able to reset data', async () => {
        const useFactory = factory();
        assert.equal(await useFactory.reset(), undefined)
        
    })
    after(async function(){
        const useFactory = factory();
        await useFactory.disconnect();
    })
});