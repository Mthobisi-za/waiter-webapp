const factory = require("../factory js/factory-function")
const assert = require("assert")
describe("Factory function tests", function(){
    beforeEach(async  function(){
        await factory().reset();
    }); 
    it("Should be able to get a week", async ()=>{
        var useFactory = factory();
        var week =[{id: 1,the_day: 'Sunday'},{id: 2,the_day: 'Monday'},{id: 3,the_day: 'Tuesday'},{id: 4,the_day: 'Wednesday'},{id: 5,the_day: 'Thursday'},{id: 6,the_day: 'Friday'},{id: 7,the_day: 'Saturday'}]
        assert.deepEqual(week, await useFactory.getWeek())
    });
    it("Should be able to get data for specific waiter", async () =>{
        var useFactory = factory();
        var data = {day: ["Monday", "Tuesday", "Wednesday"]};
        var actualData = ['Sunday','Thursday','Friday','Saturday',
        {
          checked: 'checked',
          condition: true,
          day: 'Monday'
        },
        {
          checked: 'checked',
          condition: true,
          day: 'Tuesday'
        },
        {
          checked: 'checked',
          condition: true,
          day: 'Wednesday'
        }
      ]
        await useFactory.setData(data, "Mthobisi");
        assert.deepEqual(await useFactory.getDataForWaiter("Mthobisi"), actualData)
    });
    it("shuld be able to return the arror message for entering wrong data to login screen", ()=>{
        const useFactory = factory();
        useFactory.getDataForWaiter("mhobisi2134");
        var error = "Please insert correct data with no numbers or space!";
        assert.equal(useFactory.getError().err(),error);
    });
    it("should be able to send the days picked by waiters", async function(){
        const useFactory = factory();
        var days = {day: ["Monday", "Tuesday", "Sunday"]};
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
        var data = await useFactory.getWeekAndPickedDays();
        var actualD = 
        [{class: 'white',day: 'Sunday',number: 1},
          {class: 'white',day: 'Monday',number: 1},
          {class: 'white',day: 'Tuesday',number: 1},
          {class: 'white',day: 'Wednesday',number: 0},
          {class: 'white',day: 'Thursday',number: 0},
          {class: 'white',day: 'Friday',number: 0},
          {class: 'white',day: 'Saturday',number: 0}
        ]
        assert.deepEqual(await data, data);
    });
    it('Should be able to reset the database and only return the length of the week days', async () => {
        const useFactory = factory();
        await useFactory.reset()
        assert.equal((await useFactory.getWeekAndPickedDays()).length, 7)
        
    });
    after(async function(){
        const useFactory = factory();
        await useFactory.disconnect();
    })
});