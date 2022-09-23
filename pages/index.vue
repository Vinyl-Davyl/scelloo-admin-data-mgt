<template>
    <div class="container">
       <div class="bg-[#F4F2FF] p-5 pl-14 pr-14 font-inter">
       <h3 class="mb-5 text-lg font-medium mt-12 text-[#6e6893]">TABLE HEADING</h3>
            <div class="flex flex-wrap justify-between mt-3 border-b border-gray-400/[0.6] ">
                <div class="flex flex-wrap gap-4 justify-start px-4 tabs">
                    <button @click="showing = 'All'" class="w-fit w-min-[10]">All <span :class="{'border-b-2 border-blue-800' : showing == 'All'}" class="relative top-2 w-full inline-block"></span></button>
                    <button @click="showing = 'Paid'" class="w-fit">Paid <span :class="{'border-b-2 border-blue-800' : showing == 'Paid'}" class="relative top-2 w-full inline-block"></span></button>
                    <button @click="showing = 'Unpaid'" class="w-fit">Unpaid <span :class="{'border-b-2 border-blue-800' : showing == 'Unpaid'}" class="relative  top-2 w-full inline-block"></span></button>
                    <button @click="showing = 'Overdue'" class="w-fit">Overdue <span :class="{'border-b-2 border-blue-800' : showing == 'Overdue'}" class="relative  top-2 w-full inline-block"></span></button>
                </div>
                <div class="">
                    <p class=" text-[#6E6893]">Total Payable amount: <span class="text-1xl font-bold text-[#6D5BD0]">$95,515.00</span><span class="text-1xl font-bold text-[#6E6893]"> USD</span></p>
                </div>
            </div>

            <div class="rounded-lg bg-white border border-gray-100 mt-7">

                <div class="flex flex-wrap justify-between p-3">
                    <div class="w-1/2">
                        <button @click="showfilters = !showfilters" class="border border-[#C6C2DE] p-3 text-xl mr-4 rounded-lg w-24 text-[#25213B]"><img src="~/assets/filter.png" class="inline-block"/> Filter</button>
                        <input @keyup="searcher()" v-model="searchtext" class="p-3 pl-12 w-4/5 bg-gray-100 outline-0 focus:outline-0 hover:border hover:border-[#6D5BD0] rounded-lg" placeholder="Search User by Name, Email or Date">
                        <img src="~/assets/search.png" class="relative -top-8 left-32 z-50">
                    </div>
                    <div v-if="false" class="bg-white rounded-lg  w-56 absolute left-10 top-1/3 z-50">
                        <button class=" hover:bg-gray-200 w-full p-2 block text-sm text-left">Edit</button>
                        <button class=" hover:bg-gray-200 w-full p-2 block text-sm text-left">View Profile</button>
                        <button class="text-green-600 hover:text-green-400 hover:bg-gray-200 p-2 block text-sm w-full text-left">Activate user</button>
                        <button class="text-red-600 hover:text-red-400 hover:bg-gray-200 p-2 block mt-2 text-sm w-full text-left">Delete User</button>
                    </div>
                    <div class="">
                        <button class="p-3 bg-[#6D5BD0] text-white font-medium rounded-lg">PAY DUES</button>
                    </div>
                </div>

                <div class="flex flex-nowrap bg-[#F4F2FF] p-4 pl-11 border-y-1 border-[#D9D5EC] overflow-x-auto text-[#6E6893] font-medium">
                    <div class="w-1/3 overflow-x-auto text-xs"><input type="checkbox" v-model="checkall" class="p-2 w-5 h-5 rounded-md"/></div>
                    <div class="w-1/2 overflow-x-auto text-xs">NAME</div>
                    <div class="w-9/12 overflow-x-auto text-xs">USER STATUS</div>
                    <div class="w-5/12 overflow-x-auto text-xs">PAYMENT STATUS</div>
                    <div class="w-1/4 overflow-x-auto text-xs">AMOUNT</div>
                    <!-- <div class="w-1/3 overflow-x-auto text-xs"></div> -->
                    <div class="w-1/5 overflow-x-auto text-xs text-right"><img src="~/assets/More.png" class="inline-block"></div>
                </div>
                <div class="text-1xl font-medium font-inter" v-if="searchtext.length == 0">
                    <div v-for="(userdata, index) in usingsliceddata" :key="index" class="">
                        <BaseList v-if="showing == 'All' || userdata.payment_status == showing" :checkall="checkall" :userdata="userdata"/>
                        
                    </div>                
                </div>
                <div v-else>
                    <div v-for="(userdata, index) in usingsliceddata" :key="index" class="">
                        <BaseList v-if="showing == 'All' || userdata.payment_status == showing" :checkall="checkall" :userdata="userdata"/>
                    </div>
                </div>




                <div v-if="searchtext.length == 0" class="flex flex-nowrap gap-24 justify-end bg-[#F4F2FF] text-[#6E6893] p-6">
                    <div class="">Rows per page 
                        <select v-model="intervalnum" @change="increaserows" class="bg-transparent">
                            <option v-for="(option, index) in perpageoptions" :key="index" :value="option">{{ option }}</option>
                        </select> 
                    
                    </div>
                    <div class="">{{ usingusersdata.length > 0 ?  startnum + 1 : 0 }} - {{ usingusersdata.length < endnum ? usingusersdata.length : endnum }} of {{ usingusersdata.length }}</div>
                    <div class="flex gap-16"><button @click="pages > 1 ? pages = pages - 1 : pages = 1"><img src="~/assets/arrow-left.png" class="h-fit"/></button> <button @click="pages < Math.ceil(usingusersdata.length/ intervalnum) ? pages = pages + 1 : pages = Math.ceil(usingusersdata.length/ intervalnum)"><img src="~/assets/arrow-right.png" class="h-fit"/></button> </div>
                </div>
                <div v-else class="flex flex-nowrap gap-24 justify-end bg-[#F4F2FF] text-[#6E6893] p-6">
                    <div class="">Rows per page 
                        <select v-model="intervalnum" class="bg-transparent">
                            <option v-for="(option, index) in perpageoptions" :key="index" :value="option">{{ option }}</option>
                        </select> 
                    
                    </div>
                    <div class="">{{ searchresult.length > 0 ?  startnum + 1 : 0 }} - {{ searchresult.length < endnum ? searchresult.length : endnum }} of {{ searchresult.length }}</div>
                    <div class="flex gap-16"><button @click="pages > 1 ? pages = pages - 1 : pages = 1"><img src="~/assets/arrow-left.png" class="h-fit"/></button> <button @click="pages < Math.ceil(searchresult.length / intervalnum) ? pages = pages + 1 : pages = Math.ceil(searchresult.length / intervalnum)"><img src="~/assets/arrow-right.png" class="h-fit"/></button> </div>
                </div>
            
            </div>
        </div>

        <!-- <p>{{ usingusersdata.users[0].first_name }}</p> -->
    </div>
</template>

<script setup>
//Fetching users with unique task ID
const users = await useFetch("https://cornie-assessment.herokuapp.com/users/7CYYbzAB1axtp8B")
let showing = ref('All')
let showingdown = ref(false)
let showingdownid = ref(0)
// let intervalnum = ref(10)
const perpageoptions = ref([10, 25, 50, 100, 250, 500])
const searchtext = ref("")
let searchresult = ref([])
let checkall = ref(false)

let usingusersdata = ref([])
let usingsliceddata = ref([])

// Converted all data from endpoints to JSON for brevity
const usersdata = reactive([
        {
            "first_name" : "Mathew",
            "last_name" : "Maxwell",
            "email" : "stephanie19@example.net",
            "trx_id" : 10238475,
            "user_status" : "Active",
            "last_seen" : "20/09/2022",
            "payment_status" : "Overdue",
            "payment_date" : "No data",
            "due_date" : "24/12/2021",
            "amount" : 7474,
            "currency" : "USD",
            "symbol" : "$",
            "user_activity" : [
                {
                    "date" : "20/06/2021",
                    "activity" : "Made a Purchase Order",
                    "details" : "The User made a Purchase Order for 5 Goods and Payed via Card. The User also Paid for delivery via Courier services"
                },
                {
                    "date" : "10/02/2021",
                    "activity" : "Checked Price of Goods",
                    "details" : "The user navigated to the Pricing page of 'Anti-blue Reflection Glass' and checked the price of the Goods"
                },
                {
                    "date" : "2/02/2021",
                    "activity" : "User cancelled Order",
                    "details" : "User requested Cancellation of Order on 3 goods citing reasons that 'Payment Gateway not responding"
                }
            ]
        },
        {
            "first_name" : "Mark",
            "last_name" : "Dixon",
            "email" : "jbrown@example.net",
            "trx_id" : 10983475,
            "user_status" : "Active",
            "last_seen" : "20/09/2022",
            "payment_status" : "Unpaid",
            "payment_date" : "12/12/2021",
            "due_date" : "24/12/2021",
            "amount" : 2123,
            "currency" : "USD",
            "symbol" : "$",
            "user_activity" : [
                {
                    "date" : "12/02/2021",
                    "activity" : "Made a Sales Order",
                    "details" : "The User made a Purchase Order for 5 Goods and Payed via Card. The User also Paid for delivery via Courier services"
                },
                {
                    "date" : "10/02/2021",
                    "activity" : "Checked Price of Services",
                    "details" : "The user navigated to the Pricing page of 'Anti-blue Reflection Glass' and checked the price of the Goods"
                },
                {
                    "date" : "2/02/2021",
                    "activity" : "User cancelled Order",
                    "details" : "User requested Cancellation of Order on 3 goods citing reasons that 'Payment Gateway not responding"
                }
            ]
        },
        { 
            "first_name" : "Joseph",
            "last_name" : "Weaver",
            "email" : "sarahmiranda@example.net",
            "trx_id" : 10486475,
            "user_status" : "Active",
            "last_seen" : "20/09/2022",
            "payment_date" : "No data",
            "payment_status" : "Unpaid",
            "due_date" : "24/12/2021",
            "amount" : 300,
            "currency" : "USD",
            "symbol" : "$",
            "user_activity" : []
        },
        {
            "first_name" : "Amanda",
            "last_name" : "Meyer",
            "email" : "emilyrobinson@example.net",
            "trx_id" : 10232195,
            "user_status" : "Active",
            "last_seen" : "20/09/2022",
            "payment_status" : "Paid",
            "payment_date" : "12/12/2021",
            "due_date" : "24/12/2021",
            "amount" : 8448,
            "currency" : "USD",
            "symbol" : "$",
            "user_activity" : []
        },
        {
            "first_name" : "Michelle",
            "last_name" : "Jones",
            "email" : "evansricardo@example.org",
            "trx_id" : 10238475,
            "user_status" : "Active",
            "last_seen" : "20/09/2022",
            "payment_status" : "Overdue",
            "payment_date" : "12/12/2021",
            "due_date" : "24/12/2021",
            "amount" : 7494,
            "currency" : "USD",
            "symbol" : "$",
            "user_activity" : [
                {
                    "date" : "12/02/2021",
                    "activity" : "Made a Purchase Order",
                    "details" : "The User made a Purchase Order for 5 Goods and Payed via Card. The User also Paid for delivery via Courier services"
                },
                {
                    "date" : "10/02/2021",
                    "activity" : "Checked Price of Goods",
                    "details" : "The user navigated to the Pricing page of 'Anti-blue Reflection Glass' and checked the price of the Goods"
                },
                {
                    "date" : "2/02/2021",
                    "activity" : "User cancelled Order",
                    "details" : "User requested Cancellation of Order on 3 goods citing reasons that 'Payment Gateway not responding"
                }
            ]
        },
        {
           "first_name" : "Sherry",
            "last_name" : "Hawkins",
            "email" : "sandra38@example.com",
            "trx_id" : 10983475,
            "user_status" : "Active",
            "last_seen" : "20/09/2022",
            "payment_status" : "Paid",
            "payment_date" : "12/12/2021",
            "due_date" : "24/12/2021",
            "amount" : 4094,
            "currency" : "USD",
            "symbol" : "$",
            "user_activity" : [
                {
                    "date" : "12/02/2021",
                    "activity" : "Made a Sales Order",
                    "details" : "The User made a Purchase Order for 5 Goods and Payed via Card. The User also Paid for delivery via Courier services"
                },
                {
                    "date" : "10/02/2021",
                    "activity" : "Checked Price of Services",
                    "details" : "The user navigated to the Pricing page of 'Anti-blue Reflection Glass' and checked the price of the Goods"
                },
                {
                    "date" : "2/02/2021",
                    "activity" : "User cancelled Order",
                    "details" : "User requested Cancellation of Order on 3 goods citing reasons that 'Payment Gateway not responding"
                }
            ]
        },
        {
            "first_name" : "Maria",
            "last_name" : "Campos",
            "email" : "kburgess@example.com",
            "trx_id" : 10486475,
            "user_status" : "Active",
            "last_seen" : "20/09/2022",
            "payment_date" : "12/12/2021",
            "payment_status" : "Paid",
            "due_date" : "24/12/2021",
            "amount" : 4660,
            "currency" : "USD",
            "symbol" : "$",
            "user_activity" : []
        },
        {
            "first_name" : "William",
            "last_name" : "Lowe",
            "email" : "guerraapril@example.com",
            "trx_id" : 10232195,
            "user_status" : "Active",
            "last_seen" : "20/09/2022",
            "payment_status" : "Paid",
            "payment_date" : "12/12/2021",
            "due_date" : "24/12/2021",
            "amount" : 5365,
            "currency" : "USD",
            "symbol" : "$",
            "user_activity" : []
        },
        {
            "first_name" : "Tyler",
            "last_name" : "Hudson",
            "email" : "ruizangel@example.net",
            "trx_id" : 10238475,
            "user_status" : "Active",
            "last_seen" : "20/09/2022",
            "payment_status" : "Paid",
            "payment_date" : "12/12/2021",
            "due_date" : "24/12/2021",
            "amount" : 1328,
            "currency" : "USD",
            "symbol" : "$",
            "user_activity" : [
                {
                    "date" : "12/02/2021",
                    "activity" : "Made a Purchase Order",
                    "details" : "The User made a Purchase Order for 5 Goods and Payed via Card. The User also Paid for delivery via Courier services"
                },
                {
                    "date" : "10/02/2021",
                    "activity" : "Checked Price of Goods",
                    "details" : "The user navigated to the Pricing page of 'Anti-blue Reflection Glass' and checked the price of the Goods"
                },
                {
                    "date" : "2/02/2021",
                    "activity" : "User cancelled Order",
                    "details" : "User requested Cancellation of Order on 3 goods citing reasons that 'Payment Gateway not responding"
                }
            ]
        },
        {
            "first_name" : "Sandra",
            "last_name" : "Chaves",
            "email" : "george70@example.org",
            "trx_id" : 10983475,
            "user_status" : "Active",
            "last_seen" : "20/09/2022",
            "payment_status" : "Unpaid",
            "payment_date" : "12/12/2021",
            "due_date" : "24/12/2021",
            "amount" : 5627,
            "currency" : "USD",
            "symbol" : "$",
            "user_activity" : [
                {
                    "date" : "12/02/2021",
                    "activity" : "Made a Sales Order",
                    "details" : "The User made a Purchase Order for 5 Goods and Payed via Card. The User also Paid for delivery via Courier services"
                },
                {
                    "date" : "10/02/2021",
                    "activity" : "Checked Price of Services",
                    "details" : "The user navigated to the Pricing page of 'Anti-blue Reflection Glass' and checked the price of the Goods"
                },
                {
                    "date" : "2/02/2021",
                    "activity" : "User cancelled Order",
                    "details" : "User requested Cancellation of Order on 3 goods citing reasons that 'Payment Gateway not responding"
                }
            ]
        },
        {
            "first_name" : "Jessica",
            "last_name" : "Taylor",
            "email" : "emily66@example.net",
            "trx_id" : 10486475,
            "user_status" : "Active",
            "last_seen" : "20/09/2022",
            "payment_date" : "12/12/2021",
            "payment_status" : "Unpaid",
            "due_date" : "24/12/2021",
            "amount" : 9574,
            "currency" : "USD",
            "symbol" : "$",
            "user_activity" : []
        },
        {
            "first_name" : "Kathy",
            "last_name" : "Torres",
            "email" : "brittany39@example.com",
            "trx_id" : 10232195,
            "user_status" : "Active",
            "last_seen" : "20/09/2022",
            "payment_status" : "Unpaid",
            "payment_date" : "12/12/2021",
            "due_date" : "24/12/2021",
            "amount" : 2608,
            "currency" : "USD",
            "symbol" : "$",
            "user_activity" : []
        },
        {
            "first_name" : "Lisa",
            "last_name" : "Clark",
            "email" : "waltonstephen@example.com",
            "trx_id" : 10238475,
            "user_status" : "Active",
            "last_seen" : "20/09/2022",
            "payment_status" : "Paid",
            "payment_date" : "12/12/2021",
            "due_date" : "24/12/2021",
            "amount" : 8626,
            "currency" : "USD",
            "symbol" : "$",
            "user_activity" : [
                {
                    "date" : "12/02/2021",
                    "activity" : "Made a Purchase Order",
                    "details" : "The User made a Purchase Order for 5 Goods and Payed via Card. The User also Paid for delivery via Courier services"
                },
                {
                    "date" : "10/02/2021",
                    "activity" : "Checked Price of Goods",
                    "details" : "The user navigated to the Pricing page of 'Anti-blue Reflection Glass' and checked the price of the Goods"
                },
                {
                    "date" : "2/02/2021",
                    "activity" : "User cancelled Order",
                    "details" : "User requested Cancellation of Order on 3 goods citing reasons that 'Payment Gateway not responding"
                }
            ]
        },
        {
            "first_name" : "Alisson",
            "last_name" : "Johnson",
            "email" : "alanjackson@example.org",
            "trx_id" : 10983475,
            "user_status" : "Inactive",
            "last_seen" : "20/09/2022",
            "payment_status" : "Unpaid",
            "payment_date" : "12/12/2021",
            "due_date" : "24/12/2021",
            "amount" : 5024,
            "currency" : "USD",
            "symbol" : "$",
            "user_activity" : [
                {
                    "date" : "12/02/2021",
                    "activity" : "Made a Sales Order",
                    "details" : "The User made a Purchase Order for 5 Goods and Payed via Card. The User also Paid for delivery via Courier services"
                },
                {
                    "date" : "10/02/2021",
                    "activity" : "Checked Price of Services",
                    "details" : "The user navigated to the Pricing page of 'Anti-blue Reflection Glass' and checked the price of the Goods"
                },
                {
                    "date" : "2/02/2021",
                    "activity" : "User cancelled Order",
                    "details" : "User requested Cancellation of Order on 3 goods citing reasons that 'Payment Gateway not responding"
                }
            ]
        },
        {
            "first_name" : "Micheal",
            "last_name" : "Harris",
            "email" : "angelataylor@example.net",
            "trx_id" : 10486475,
            "user_status" : "Active",
            "last_seen" : "20/09/2022",
            "payment_date" : "12/12/2021",
            "payment_status" : "Unpaid",
            "due_date" : "24/12/2021",
            "amount" : 3280,
            "currency" : "USD",
            "symbol" : "$",
            "user_activity" : []
        },
        {
            "first_name" : "Katherine",
            "last_name" : "Smith",
            "email" : "chaveztammy@example.net",
            "trx_id" : 10232195,
            "user_status" : "Active",
            "last_seen" : "20/09/2022",
            "payment_status" : "Paid",
            "payment_date" : "12/12/2021",
            "due_date" : "24/12/2021",
            "amount" : 4314,
            "currency" : "USD",
            "symbol" : "$",
            "user_activity" : []
        }
])

let pages = ref(1)
let startnum = ref(0)
let intervalnum = ref(10)
let endnum = ref(10)
const endss = computed(() => { return usingusersdata.value.length })
let limitnum = endss
let showactions = ref(false)
let showfilters = ref(false)


// usingusersdata.value = usersdata;
// console.log(usingusersdata.value)

watchEffect(() => {

    // console.log(startnum.value)
    // console.log(endnum.value)

    if(showing.value != 'All'){
        usingusersdata.value = usersdata.filter(x => x.payment_status == showing.value)
        usingsliceddata.value = usingusersdata.value.slice(startnum.value, endnum.value)
    }else{
        usingusersdata.value = usersdata;
        usingsliceddata.value = usingusersdata.value.slice(startnum.value, endnum.value)
         
    }

    searcher();

    // console.log(usingusersdata.value.length)
})

watchEffect(() => {

    
    if(searchtext.value == 0){
        startnum.value = ((pages.value - 1) * intervalnum.value)
        endnum.value = intervalnum.value * pages.value > usingusersdata.value.length ? usingusersdata.value.length : intervalnum.value * pages.value
    }else{
        startnum.value = ((pages.value - 1) * intervalnum.value)
        endnum.value = intervalnum.value * pages.value > usingusersdata.value.length ? usingusersdata.value.length : intervalnum.value * pages.value
    }
    
})

let currentitemid = ref(0)
let currentlychecked = ref(false)

function currentlyOn(uid, event){
    currentitemid.value = uid
    currentlychecked.value = event.target.checked 
}


function searcher(){
    // alert("searching")

    // let query = this.searchQuery
    // console.log(searchtext.value)
    if(searchtext.value.length == 0){
        searchresult.value = []
        // usingusersdata.value = usersdata
    }else{
        let regsearch = new RegExp(`${searchtext.value}`, 'gi')
        // let regsearch2 = /searchtext.value/ig
        searchresult.value = usingusersdata.value.filter( (x) => x.first_name.match(regsearch) || x.last_name.match(regsearch) || x.email.match(regsearch) || x.payment_date.match(regsearch) || x.due_date.match(regsearch))
        usingsliceddata.value = searchresult.value.slice(startnum.value, endnum.value)
        // usingusersdata.value = searchresult.value
        // console.log(searchresult.value)    
    }
    
}
</script>

<style scoped>
.tabs button{
  font-weight: bold;
  font-size: 14px !important;
  color: #6e6893 !important;
  padding: 0;
  letter-spacing: 2px;
}
</style>