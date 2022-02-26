```1 在做动态增减表单项的时候，里面有个 checkbox，一开头通过设置 checkbox 的 defaultChecked = true 可以实现点击 add 时
使新增的 checkbox 是选中状态，但是 checkbox 的回显却出了问题，不能回显，于是 FormItem 设置了 valuePropName={'checked'} 
这时 checkbox 终于可以回显了，但是当点击 add 时 checkbox 却是未选中状态，也就是说给 checkbox 设置的 defaultChecked 失效了
这点卡了我两三天，后来凭着不放弃的精神仔细阅读了 antd 上 form 的使用说明，终于找到了答案：
图见：[动态增减表单项遇到的问题.png]

```

```2 在使用 useState 时遇到的问题，我们知道 useState 是异步更新的，例如 setRowIndex(array);，当我们点击 checkbox 时
input 的 disable 并未会及时刷新，因为是异步的，想要改成同步也非常简单，改成这样便可以了 setRowIndex(() => ([...array]));

```





