"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default_comparer = exports.Heap = exports.with_time = exports.gen_rand_arr = exports.Ordering = void 0;
var Ordering;
(function (Ordering) {
    Ordering[Ordering["Less"] = 0] = "Less";
    Ordering[Ordering["Equal"] = 1] = "Equal";
    Ordering[Ordering["Greater"] = 2] = "Greater";
})(Ordering = exports.Ordering || (exports.Ordering = {}));
Array.prototype.swap = function (a, b) {
    if (a >= this.length || a < 0)
        throw new RangeError("参数1超出范围");
    if (b >= this.length || b < 0)
        throw new RangeError("参数2超出范围");
    const temp = this[a];
    this[a] = this[b];
    this[b] = temp;
};
Array.prototype.clone = function () {
    return this.map((v) => v);
};
Number.prototype.compare = function (other) {
    if (this < other) {
        return Ordering.Less;
    }
    else if (this > other) {
        return Ordering.Greater;
    }
    else {
        return Ordering.Equal;
    }
};
String.prototype.compare = function (other) {
    if (this < other) {
        return Ordering.Less;
    }
    else if (this > other) {
        return Ordering.Greater;
    }
    else {
        return Ordering.Equal;
    }
};
function gen_rand(min, max) {
    if (min > max)
        throw new RangeError("不存在的范围");
    let range = max - min;
    let _rand = Math.random();
    let rand = Math.trunc(_rand * range + min);
    if (rand === 0)
        rand = Math.abs(rand);
    return rand;
}
function gen_rand_arr(length, range) {
    const min = range[0];
    const max = range[1];
    const arr = [];
    for (let i = 0; i < length; ++i) {
        arr.push(gen_rand(min, max));
    }
    return arr;
}
exports.gen_rand_arr = gen_rand_arr;
function with_time(fn, arg, label) {
    console.time(label);
    const ret = fn.apply(null, arg);
    console.timeEnd(label);
    return ret;
}
exports.with_time = with_time;
class Heap {
    container = [];
    constructor(init) {
        if (init === void 0) {
            return;
        }
        for (let item of init) {
            this.push(item);
        }
    }
    size() {
        return this.container.length;
    }
    push(item) {
        const length = this.container.push(item);
        this.swim(length - 1);
        return length;
    }
    pop() {
        if (this.is_empty()) {
            return void 0;
        }
        const first = this.container[0];
        const last = this.container.pop();
        if (!this.is_empty()) {
            this.container[0] = last;
            this.sink(0);
        }
        return first;
    }
    //上浮
    swim(index) {
        while (Heap.parent_index(index) >= 0 &&
            this.compare_by_index(index, Heap.parent_index(index)) === Ordering.Less) {
            const parent_index = Heap.parent_index(index);
            this.swap(index, parent_index);
            index = parent_index;
        }
    }
    // 下沉
    sink(index) {
        while (Heap.left_child_index(index) < this.size()) {
            let min_index = Heap.left_child_index(index);
            let right_child_index = Heap.right_child_index(index);
            if (right_child_index < this.size()) {
                if (this.compare_by_index(right_child_index, min_index) === Ordering.Less) {
                    min_index = right_child_index;
                }
            }
            if (this.compare_by_index(index, min_index) !== Ordering.Greater) {
                break;
            }
            this.swap(index, min_index);
            index = min_index;
        }
    }
    static default_comparer = (a, b) => a.compare(b);
    static heapify(arr, start, end, compare = Heap.default_comparer) {
        if (end - start <= 0)
            return;
        let last = Heap.parent_index(end);
        while (last >= 0) {
            Heap.sink(arr, last, end, compare);
            --last;
        }
    }
    static swim(arr, index, compare = Heap.default_comparer) {
        while (Heap.parent_index(index) >= 0) {
            const parent_index = Heap.parent_index(index);
            if (compare(arr[index], arr[parent_index]) === Ordering.Less) {
                arr.swap(index, parent_index);
            }
        }
    }
    static sink(arr, index, end, compare = Heap.default_comparer) {
        while (Heap.left_child_index(index) <= end) {
            let need_swap_index = Heap.left_child_index(index);
            let right_child_index = need_swap_index + 1;
            if (right_child_index <= end) {
                if (compare(arr[right_child_index], arr[need_swap_index]) === Ordering.Less) {
                    need_swap_index = right_child_index;
                }
            }
            if (compare(arr[need_swap_index], arr[index]) !== Ordering.Less) {
                break;
            }
            arr.swap(index, need_swap_index);
            index = need_swap_index;
        }
    }
    is_empty() {
        return this.size() === 0;
    }
    compare_by_index(a, b) {
        return this.container[a].compare(this.container[b]);
    }
    static parent_index(index) {
        if (index === 0)
            return 0;
        return (index - 1) >> 1;
    }
    static left_child_index(index) {
        return index * 2 + 1;
    }
    static right_child_index(index) {
        return index * 2 + 2;
    }
    swap(a, b) {
        this.container.swap(a, b);
    }
}
exports.Heap = Heap;
function default_comparer(a, b) {
    return a.compare(b);
}
exports.default_comparer = default_comparer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsSUFBWSxRQUlYO0FBSkQsV0FBWSxRQUFRO0lBQ25CLHVDQUFJLENBQUE7SUFDSix5Q0FBSyxDQUFBO0lBQ0wsNkNBQU8sQ0FBQTtBQUNSLENBQUMsRUFKVyxRQUFRLEdBQVIsZ0JBQVEsS0FBUixnQkFBUSxRQUluQjtBQUlELEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBUyxFQUFFLENBQVM7SUFDcEQsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUFFLE1BQU0sSUFBSSxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDL0QsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUFFLE1BQU0sSUFBSSxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDL0QsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JCLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEIsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztBQUNoQixDQUFDLENBQUM7QUFDRixLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRztJQUN2QixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzNCLENBQUMsQ0FBQztBQUNGLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHLFVBQVUsS0FBYTtJQUNqRCxJQUFJLElBQUksR0FBRyxLQUFLLEVBQUU7UUFDakIsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDO0tBQ3JCO1NBQU0sSUFBSSxJQUFJLEdBQUcsS0FBSyxFQUFF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QUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBQ0QsTUFBTSxDQUFDLFlBQVksQ0FBQyxLQUFhO1FBQ2hDLElBQUksS0FBSyxLQUFLLENBQUM7WUFBRSxPQUFPLENBQUMsQ0FBQztRQUMxQixPQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBQ0QsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEtBQWE7UUFDcEMsT0FBTyxLQUFLLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBQ0QsTUFBTSxDQUFDLGlCQUFpQixDQUFDLEtBQWE7UUFDckMsT0FBTyxLQUFLLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBQ08sSUFBSSxDQUFDLENBQVMsRUFBRSxDQUFTO1FBQ2hDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMzQixDQUFDOztBQU9nQyxvQkFBSTtBQUp0QyxTQUFTLGdCQUFnQixDQUF1QixDQUFJLEVBQUUsQ0FBSTtJQUN6RCxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDckIsQ0FBQztBQUV1Qyw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZW51bSBPcmRlcmluZyB7XG5cdExlc3MsXG5cdEVxdWFsLFxuXHRHcmVhdGVyLFxufVxuZXhwb3J0IGludGVyZmFjZSBDb21wYXJlPFQgZXh0ZW5kcyBDb21wYXJlPFQ+PiB7XG5cdGNvbXBhcmUob3JoZXI6IFQpOiBPcmRlcmluZztcbn1cbkFycmF5LnByb3RvdHlwZS5zd2FwID0gZnVuY3Rpb24gKGE6IG51bWJlciwgYjogbnVtYmVyKSB7XG5cdGlmIChhID49IHRoaXMubGVuZ3RoIHx8IGEgPCAwKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIuWPguaVsDHotoXlh7rojIPlm7RcIik7XG5cdGlmIChiID49IHRoaXMubGVuZ3RoIHx8IGIgPCAwKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIuWPguaVsDLotoXlh7rojIPlm7RcIik7XG5cdGNvbnN0IHRlbXAgPSB0aGlzW2FdO1xuXHR0aGlzW2FdID0gdGhpc1tiXTtcblx0dGhpc1tiXSA9IHRlbXA7XG59O1xuQXJyYXkucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24gKCk6IEFycmF5PG51bWJlcj4ge1xuXHRyZXR1cm4gdGhpcy5tYXAoKHYpID0+IHYpO1xufTtcbk51bWJlci5wcm90b3R5cGUuY29tcGFyZSA9IGZ1bmN0aW9uIChvdGhlcjogTnVtYmVyKTogT3JkZXJpbmcge1xuXHRpZiAodGhpcyA8IG90aGVyKSB7XG5cdFx0cmV0dXJuIE9yZGVyaW5nLkxlc3M7XG5cdH0gZWxzZSBpZiAodGhpcyA+IG90aGVyKSB7XG5cdFx0cmV0dXJuIE9yZGVyaW5nLkdyZWF0ZXI7XG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIE9yZGVyaW5nLkVxdWFsO1xuXHR9XG59O1xuU3RyaW5nLnByb3RvdHlwZS5jb21wYXJlID0gZnVuY3Rpb24gKG90aGVyOiBzdHJpbmcpOiBPcmRlcmluZyB7XG5cdGlmICh0aGlzIDwgb3RoZXIpIHtcblx0XHRyZXR1cm4gT3JkZXJpbmcuTGVzcztcblx0fSBlbHNlIGlmICh0aGlzID4gb3RoZXIpIHtcblx0XHRyZXR1cm4gT3JkZXJpbmcuR3JlYXRlcjtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gT3JkZXJpbmcuRXF1YWw7XG5cdH1cbn07XG5cbmZ1bmN0aW9uIGdlbl9yYW5kKG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcik6IG51bWJlciB7XG5cdGlmIChtaW4gPiBtYXgpIHRocm93IG5ldyBSYW5nZUVycm9yKFwi5LiN5a2Y5Zyo55qE6IyD5Zu0XCIpO1xuXHRsZXQgcmFuZ2UgPSBtYXggLSBtaW47XG5cdGxldCBfcmFuZCA9IE1hdGgucmFuZG9tKCk7XG5cdGxldCByYW5kID0gTWF0aC50cnVuYyhfcmFuZCAqIHJhbmdlICsgbWluKTtcblx0aWYgKHJhbmQgPT09IDApIHJhbmQgPSBNYXRoLmFicyhyYW5kKTtcblx0cmV0dXJuIHJhbmQ7XG59XG5mdW5jdGlvbiBnZW5fcmFuZF9hcnIobGVuZ3RoOiBudW1iZXIsIHJhbmdlOiBbbnVtYmVyLCBudW1iZXJdKTogQXJyYXk8bnVtYmVyPiB7XG5cdGNvbnN0IG1pbiA9IHJhbmdlWzBdO1xuXHRjb25zdCBtYXggPSByYW5nZVsxXTtcblx0Y29uc3QgYXJyID0gW107XG5cdGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcblx0XHRhcnIucHVzaChnZW5fcmFuZChtaW4sIG1heCkpO1xuXHR9XG5cdHJldHVybiBhcnI7XG59XG5mdW5jdGlvbiB3aXRoX3RpbWU8VCBleHRlbmRzICguLi5hcmdzOiBhbnkpID0+IGFueT4oZm46IFQsIGFyZzogUGFyYW1ldGVyczxUPiwgbGFiZWw/OiBzdHJpbmcpOiBSZXR1cm5UeXBlPFQ+IHtcblx0Y29uc29sZS50aW1lKGxhYmVsKTtcblx0Y29uc3QgcmV0ID0gZm4uYXBwbHkobnVsbCwgYXJnKTtcblx0Y29uc29sZS50aW1lRW5kKGxhYmVsKTtcblx0cmV0dXJuIHJldDtcbn1cblxudHlwZSBDb21wYXJlVHlwZSA9IDxUIGV4dGVuZHMgQ29tcGFyZTxUPj4oYTogVCwgYjogVCkgPT4gT3JkZXJpbmc7XG5jbGFzcyBIZWFwPFQgZXh0ZW5kcyBDb21wYXJlPFQ+PiB7XG5cdGNvbnRhaW5lcjogQXJyYXk8VD4gPSBbXTtcblx0Y29uc3RydWN0b3IoaW5pdD86IEl0ZXJhYmxlPFQ+KSB7XG5cdFx0aWYgKGluaXQgPT09IHZvaWQgMCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRmb3IgKGxldCBpdGVtIG9mIGluaXQpIHtcblx0XHRcdHRoaXMucHVzaChpdGVtKTtcblx0XHR9XG5cdH1cblx0cHVibGljIHNpemUoKSB7XG5cdFx0cmV0dXJuIHRoaXMuY29udGFpbmVyLmxlbmd0aDtcblx0fVxuXHRwdWJsaWMgcHVzaChpdGVtOiBUKTogbnVtYmVyIHtcblx0XHRjb25zdCBsZW5ndGggPSB0aGlzLmNvbnRhaW5lci5wdXNoKGl0ZW0pO1xuXHRcdHRoaXMuc3dpbShsZW5ndGggLSAxKTtcblx0XHRyZXR1cm4gbGVuZ3RoO1xuXHR9XG5cdHB1YmxpYyBwb3AoKTogVCB8IHVuZGVmaW5lZCB7XG5cdFx0aWYgKHRoaXMuaXNfZW1wdHkoKSkge1xuXHRcdFx0cmV0dXJuIHZvaWQgMDtcblx0XHR9XG5cdFx0Y29uc3QgZmlyc3QgPSB0aGlzLmNvbnRhaW5lclswXTtcblx0XHRjb25zdCBsYXN0ID0gdGhpcy5jb250YWluZXIucG9wKCkhO1xuXHRcdGlmICghdGhpcy5pc19lbXB0eSgpKSB7XG5cdFx0XHR0aGlzLmNvbnRhaW5lclswXSA9IGxhc3Q7XG5cdFx0XHR0aGlzLnNpbmsoMCk7XG5cdFx0fVxuXHRcdHJldHVybiBmaXJzdDtcblx0fVxuXHQvL+S4iua1rlxuXHRwdWJsaWMgc3dpbShpbmRleDogbnVtYmVyKSB7XG5cdFx0d2hpbGUgKFxuXHRcdFx0SGVhcC5wYXJlbnRfaW5kZXgoaW5kZXgpID49IDAgJiZcblx0XHRcdHRoaXMuY29tcGFyZV9ieV9pbmRleChpbmRleCwgSGVhcC5wYXJlbnRfaW5kZXgoaW5kZXgpKSA9PT0gT3JkZXJpbmcuTGVzc1xuXHRcdCkge1xuXHRcdFx0Y29uc3QgcGFyZW50X2luZGV4ID0gSGVhcC5wYXJlbnRfaW5kZXgoaW5kZXgpO1xuXHRcdFx0dGhpcy5zd2FwKGluZGV4LCBwYXJlbnRfaW5kZXgpO1xuXHRcdFx0aW5kZXggPSBwYXJlbnRfaW5kZXg7XG5cdFx0fVxuXHR9XG5cdC8vIOS4i+ayiVxuXHRwdWJsaWMgc2luayhpbmRleDogbnVtYmVyKSB7XG5cdFx0d2hpbGUgKEhlYXAubGVmdF9jaGlsZF9pbmRleChpbmRleCkgPCB0aGlzLnNpemUoKSkge1xuXHRcdFx0bGV0IG1pbl9pbmRleCA9IEhlYXAubGVmdF9jaGlsZF9pbmRleChpbmRleCk7XG5cdFx0XHRsZXQgcmlnaHRfY2hpbGRfaW5kZXggPSBIZWFwLnJpZ2h0X2NoaWxkX2luZGV4KGluZGV4KTtcblx0XHRcdGlmIChyaWdodF9jaGlsZF9pbmRleCA8IHRoaXMuc2l6ZSgpKSB7XG5cdFx0XHRcdGlmICh0aGlzLmNvbXBhcmVfYnlfaW5kZXgocmlnaHRfY2hpbGRfaW5kZXgsIG1pbl9pbmRleCkgPT09IE9yZGVyaW5nLkxlc3MpIHtcblx0XHRcdFx0XHRtaW5faW5kZXggPSByaWdodF9jaGlsZF9pbmRleDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKHRoaXMuY29tcGFyZV9ieV9pbmRleChpbmRleCwgbWluX2luZGV4KSAhPT0gT3JkZXJpbmcuR3JlYXRlcikge1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdHRoaXMuc3dhcChpbmRleCwgbWluX2luZGV4KTtcblx0XHRcdGluZGV4ID0gbWluX2luZGV4O1xuXHRcdH1cblx0fVxuXHRzdGF0aWMgZGVmYXVsdF9jb21wYXJlcjogQ29tcGFyZVR5cGUgPSA8VCBleHRlbmRzIENvbXBhcmU8VD4+KGE6IFQsIGI6IFQpID0+IGEuY29tcGFyZShiKTtcblx0c3RhdGljIGhlYXBpZnk8VCBleHRlbmRzIENvbXBhcmU8VD4+KFxuXHRcdGFycjogQXJyYXk8VD4sXG5cdFx0c3RhcnQ6IG51bWJlcixcblx0XHRlbmQ6IG51bWJlcixcblx0XHRjb21wYXJlOiBDb21wYXJlVHlwZSA9IEhlYXAuZGVmYXVsdF9jb21wYXJlclxuXHQpIHtcblx0XHRpZiAoZW5kIC0gc3RhcnQgPD0gMCkgcmV0dXJuO1xuXHRcdGxldCBsYXN0ID0gSGVhcC5wYXJlbnRfaW5kZXgoZW5kKTtcblx0XHR3aGlsZSAobGFzdCA+PSAwKSB7XG5cdFx0XHRIZWFwLnNpbmsoYXJyLCBsYXN0LCBlbmQsIGNvbXBhcmUpO1xuXHRcdFx0LS1sYXN0O1xuXHRcdH1cblx0fVxuXHRzdGF0aWMgc3dpbTxUIGV4dGVuZHMgQ29tcGFyZTxUPj4oYXJyOiBBcnJheTxUPiwgaW5kZXg6IG51bWJlciwgY29tcGFyZTogQ29tcGFyZVR5cGUgPSBIZWFwLmRlZmF1bHRfY29tcGFyZXIpIHtcblx0XHR3aGlsZSAoSGVhcC5wYXJlbnRfaW5kZXgoaW5kZXgpID49IDApIHtcblx0XHRcdGNvbnN0IHBhcmVudF9pbmRleCA9IEhlYXAucGFyZW50X2luZGV4KGluZGV4KTtcblx0XHRcdGlmIChjb21wYXJlKGFycltpbmRleF0sIGFycltwYXJlbnRfaW5kZXhdKSA9PT0gT3JkZXJpbmcuTGVzcykge1xuXHRcdFx0XHRhcnIuc3dhcChpbmRleCwgcGFyZW50X2luZGV4KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0c3RhdGljIHNpbms8VCBleHRlbmRzIENvbXBhcmU8VD4+KFxuXHRcdGFycjogQXJyYXk8VD4sXG5cdFx0aW5kZXg6IG51bWJlcixcblx0XHRlbmQ6IG51bWJlcixcblx0XHRjb21wYXJlOiBDb21wYXJlVHlwZSA9IEhlYXAuZGVmYXVsdF9jb21wYXJlclxuXHQpIHtcblx0XHR3aGlsZSAoSGVhcC5sZWZ0X2NoaWxkX2luZGV4KGluZGV4KSA8PSBlbmQpIHtcblx0XHRcdGxldCBuZWVkX3N3YXBfaW5kZXggPSBIZWFwLmxlZnRfY2hpbGRfaW5kZXgoaW5kZXgpO1xuXHRcdFx0bGV0IHJpZ2h0X2NoaWxkX2luZGV4ID0gbmVlZF9zd2FwX2luZGV4ICsgMTtcblx0XHRcdGlmIChyaWdodF9jaGlsZF9pbmRleCA8PSBlbmQpIHtcblx0XHRcdFx0aWYgKGNvbXBhcmUoYXJyW3JpZ2h0X2NoaWxkX2luZGV4XSwgYXJyW25lZWRfc3dhcF9pbmRleF0pID09PSBPcmRlcmluZy5MZXNzKSB7XG5cdFx0XHRcdFx0bmVlZF9zd2FwX2luZGV4ID0gcmlnaHRfY2hpbGRfaW5kZXg7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmIChjb21wYXJlKGFycltuZWVkX3N3YXBfaW5kZXhdLCBhcnJbaW5kZXhdKSAhPT0gT3JkZXJpbmcuTGVzcykge1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGFyci5zd2FwKGluZGV4LCBuZWVkX3N3YXBfaW5kZXgpO1xuXHRcdFx0aW5kZXggPSBuZWVkX3N3YXBfaW5kZXg7XG5cdFx0fVxuXHR9XG5cblx0cHVibGljIGlzX2VtcHR5KCk6IGJvb2xlYW4ge1xuXHRcdHJldHVybiB0aGlzLnNpemUoKSA9PT0gMDtcblx0fVxuXHRwcml2YXRlIGNvbXBhcmVfYnlfaW5kZXgoYTogbnVtYmVyLCBiOiBudW1iZXIpIHtcblx0XHRyZXR1cm4gdGhpcy5jb250YWluZXJbYV0uY29tcGFyZSh0aGlzLmNvbnRhaW5lcltiXSk7XG5cdH1cblx0c3RhdGljIHBhcmVudF9pbmRleChpbmRleDogbnVtYmVyKTogbnVtYmVyIHtcblx0XHRpZiAoaW5kZXggPT09IDApIHJldHVybiAwO1xuXHRcdHJldHVybiAoaW5kZXggLSAxKSA+PiAxO1xuXHR9XG5cdHN0YXRpYyBsZWZ0X2NoaWxkX2luZGV4KGluZGV4OiBudW1iZXIpOiBudW1iZXIge1xuXHRcdHJldHVybiBpbmRleCAqIDIgKyAxO1xuXHR9XG5cdHN0YXRpYyByaWdodF9jaGlsZF9pbmRleChpbmRleDogbnVtYmVyKTogbnVtYmVyIHtcblx0XHRyZXR1cm4gaW5kZXggKiAyICsgMjtcblx0fVxuXHRwcml2YXRlIHN3YXAoYTogbnVtYmVyLCBiOiBudW1iZXIpIHtcblx0XHR0aGlzLmNvbnRhaW5lci5zd2FwKGEsIGIpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRfY29tcGFyZXI8VCBleHRlbmRzIENvbXBhcmU8VD4+KGE6IFQsIGI6IFQpIHtcblx0cmV0dXJuIGEuY29tcGFyZShiKTtcbn1cblxuZXhwb3J0IHsgZ2VuX3JhbmRfYXJyLCB3aXRoX3RpbWUsIEhlYXAsIGRlZmF1bHRfY29tcGFyZXIsIENvbXBhcmVUeXBlIH07XG4iXX0=