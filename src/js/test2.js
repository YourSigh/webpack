/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
    while(true) {
        let i = Math.floor(Math.random() * nums.length);
        let count = 0;
        for (let j = 0; j < nums.length; j++) {
            if (nums[j] == nums[i]) {
                count++;
            }
        }
        if (count > nums.length / 2) {
            return nums[i];
        }
    }
};