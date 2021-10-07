module.exports = function makeChanges(pool){
    async function getWeek(){
        var data = await pool.query("select * from week");
        return await data.rows
    }
    async function setDataWaiter(arg, name){
        var str = arg.day.toString();
        var check = await pool.query("select * from waiters where waiter_name = $1 ", [name]);
        if(await check.rows.length < 1){
            await pool.query("insert into waiters(waiter_name, days) values($1,$2)", [name, str])
        } else{
            await pool.query(`UPDATE waiters  SET  days = $1  WHERE waiter_name = $2`, [ str,name])
        }
    }
    async function checkBeforeData(name){
        var check = await pool.query("select * from waiters where waiter_name = $1 ", [name]);
        return await check.rows
    }
    async function filterOut(){
        var data = await pool.query("select * from waiters");
        console.log(data.rows)
        return await data.rows
    }
    async function getDataForWaiter(name){
        var data = await pool.query("select days from waiters where waiter_name = $1", [name]);
        return await data.rows
    }
    async function reset(){
        await pool.query("delete from waiters");
    }
    return{
        getWeek,
        setDataWaiter,
        checkBeforeData,
        filterOut,
        getDataForWaiter,
        reset
    }
}