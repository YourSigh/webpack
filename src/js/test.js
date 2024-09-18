/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * 检查链表是否有环
 * @param {ListNode} head - 链表的头节点
 * @return {boolean} - 如果链表有环则返回 true，否则返回 false
 */
var hasCycle = function(head) {
    // 如果链表为空或只有一个节点，直接返回 false
    if (head == null || head.next == null) {
        return false;
    }

    // 初始化快慢指针
    let fast = head.next; // 快指针从第二个节点开始
    let slow = head;      // 慢指针从第一个节点开始

    // 当快慢指针不相等时，继续循环
    while (fast != slow) {
        // 如果快指针到达链表末尾，说明没有环
        if (fast == null || fast.next == null) {
            return false;
        }

        // 快指针每次移动两步
        fast = fast.next.next;
        // 慢指针每次移动一步
        slow = slow.next;
    }

    // 如果快慢指针相遇，则说明链表有环
    return true;
};
