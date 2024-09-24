/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
    // let i = 0;
    // let j = 0;
    // while (j < nums.length) {
    //     if (nums[j] !== 0) {
    //         [nums[i], nums[j]] = [nums[j], nums[i]];
    //         i++;
    //     }
    //     j++;
    // }
    // return nums;
    let len = nums.length;
    let ans = nums.filter((item) => item!== 0);
    for (let i = 0; i < len - ans.length; i++) {
        ans.push(0);
    }
    return ans;
};

console.log(moveZeroes([0,1,0,3,12]));