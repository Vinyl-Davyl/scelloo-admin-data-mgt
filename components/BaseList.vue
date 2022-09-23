<template>
    <div>
        <div class="flex flex-nowrap p-4 pl-11 pt-3 overflow-x-auto border-b border-[#D9D5EC]" :class="{'bg-[#F2F0F9]' : selected || showactions }">
            <div class="w-1/3 overflow-x-auto text-xs"><input type="checkbox" v-model="selected" class="p-2 w-5 h-5 rounded-md inline-block"/> <button @click="showingdown = !showingdown" class="inline-block ml-4 mt-3"><img v-if="showingdown == true" src="~/assets/Up.png"  class="-mt-3 ml-4 h-5 w-5 inline-block"><img v-if="showingdown == false" src="~/assets/down-arrow.png"  class="-mt-3 ml-4 h-5 w-5 inline-block"></button></div>
            <div class="w-1/2 overflow-x-auto text-sm">{{ userdata.first_name }} {{ userdata.last_name }} <br> <span class="text-gray-400 text-xs">{{ userdata.email }}</span></div>
            <div class="w-9/12 overflow-x-auto text-xs">
                <span class="rounded-2xl px-2" :class="{ 'bg-[#E6E6F2] text-[#4A4AFF]' : userdata.user_status == 'Active', 'text-[#6E6893] bg-[#F2F0F9]' : userdata.user_status == 'Inactive'}"><span :class="{ 'bg-[#4A4AFF]' : userdata.user_status == 'Active', 'bg-[#6E6893]' : userdata.user_status == 'Inactive'}" class="w-2 h-2 mr-1 inline-block rounded-full"></span>{{ userdata.user_status }}</span>
                <p class="py-2 text-gray-400">Last login : {{ userdata.last_seen }}</p>
            </div>
            <div class="w-5/12 overflow-x-auto text-xs">
                <span class="rounded-2xl px-2" :class="{ 'bg-[#CDFFCD] text-[#007F00]' : userdata.payment_status == 'Paid', 'text-[#CE8500] bg-[#FFECCC]' : userdata.payment_status == 'Unpaid', 'text-[#D30000] bg-[#FFE0E0]' : userdata.payment_status == 'Overdue'}"><span :class="{ 'bg-[#007F00]' : userdata.payment_status == 'Paid', 'bg-[#CE8500]' : userdata.payment_status == 'Unpaid', 'bg-[#D30000]' : userdata.payment_status == 'Overdue'}" class="w-2 h-2 mr-1 inline-block rounded-full"></span>{{ userdata.payment_status }}</span>
                <p class="py-2 text-gray-400">{{ userdata.payment_status == 'Paid' ? 'Paid on' : userdata.payment_status == 'Unpaid' ? 'Dues on' : userdata.payment_status == 'Overdue' ? 'Dued on' : '' }} {{ userdata.payment_status == 'Paid' ? userdata.payment_date : userdata.due_date}}</p>
            </div>
            <div class="w-1/4 overflow-x-auto text-md">{{ userdata.symbol }}{{ userdata.amount }} <br><span class="block pl-2 text-sm text-gray-400">{{ userdata.currency }}</span></div>
            <!-- <div class="w-1/3 overflow-x-auto text-xs">view more</div> -->
            <!-- <div class="w-1/5 overflow-x-auto text-xs text-right">
                <button><span class="inline-block mr-3 text-[#6E6893]">View more</span> <img src="~/assets/More.png" class="inline-block"></button>
            
            </div> -->
            <div class="w-1/3 overflow-x-auto">
                <button class="p-2 list-button w-full text-right text-[#6E6893] gap-4 rounded-md" variant="success" @click="showactions = !showactions">
                <span v-if="!showactions" class="inline-block mr-5">view more</span>
                <img v-if="!showactions" src="@/assets/More.png" class="inline-block"/> <img v-if="showactions" src="@/assets/close.png" class="inline-block w-5 h-5" /> </button><br>
                <!-- <button v-if="item.req_status == 'Unapproved'" class="p-1 list-button mt-1" variant="danger" @click="confirmdisapprove()"> Disapp </button> -->
                <div v-if="showactions" class="bg-white rounded-lg  w-56 absolute right-10 z-50">
                    <button class=" hover:bg-gray-200 w-full p-2 block text-sm text-left">Edit</button>
                    <button class=" hover:bg-gray-200 w-full p-2 block text-sm text-left">View Profile</button>
                    <button class="text-green-600 hover:text-green-400 hover:bg-gray-200 p-2 block text-sm w-full text-left">Activate user</button>
                    <button class="text-red-600 hover:text-red-400 hover:bg-gray-200 p-2 block mt-2 text-sm w-full text-left">Delete User</button>
                </div>
            </div>    
        </div>
        

        <div class="bg-[#F4F2FF]" v-if="showingdown == true">
            <div class="flex flex-nowrap bg-[#F2F0F9] p-4 pl-40 border-y-1 border-[#D9D5EC] overflow-x-auto">
                <div class="w-1/4 overflow-x-auto text-xs">DATE</div>
                <div class="w-1/4 overflow-x-auto text-xs">USER ACTIVITY</div>
                <div class="w-1/4 overflow-x-auto text-xs">DETAILS <img src="~/assets/details.png" class="inline-block ml-3 -mt-1"></div>
            </div>
            <div v-if="userdata.user_activity.length > 0">
                <div v-for="(activity, index) in userdata.user_activity" :key="index" class="">
                    <div class="flex flex-nowrap p-4 pl-40 mt-3 overflow-x-auto border-b border-[#D9D5EC]">
                        <div class="w-1/4 overflow-x-auto text-sm">{{ activity.date }}</div>
                        <div class="w-1/4 overflow-x-auto text-xs">
                            {{ activity.activity }}
                        </div>
                        <div class="w-1/4 overflow-x-auto text-xs">
                            {{ activity.details }}
                        </div>
                    </div>

                </div>
            </div>
            <div v-else>
                <p class="text-xl text-center p-5 text-[#6E6893]">NO RECORDS FOUND</p>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    userdata : Object,
    showing : String,
    checkall : Boolean
})

let selected = ref(false)
let showingdown = ref(false)
let showactions = ref(false)

watch(() => props.checkall, (check) => {
        selected.value = check
})

</script>

<style lang="scss" scoped>

</style>