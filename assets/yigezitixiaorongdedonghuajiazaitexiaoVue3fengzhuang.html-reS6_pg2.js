import{_ as n,o as s,c as a,e as p}from"./app-jmEemqZF.js";const t={},e=p(`<p>简单的架子，保证加载结束后，动画隐去</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//loadingHide.vue</span>
<span class="token operator">&lt;</span>template lang<span class="token operator">=</span><span class="token string">&quot;html&quot;</span><span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span>transition name<span class="token operator">=</span><span class="token string">&quot;fade&quot;</span><span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span>getSuccess用来控制动画隐藏的 <span class="token operator">--</span><span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>div <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">&quot;loading-hide&quot;</span> v<span class="token operator">-</span>show<span class="token operator">=</span><span class="token string">&quot;props.getSuccess&quot;</span><span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span>pageInfo用来控制字体消融内字体信息，动画时间的 <span class="token operator">--</span><span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>Loading <span class="token operator">:</span>pageInfo<span class="token operator">=</span><span class="token string">&quot;pageInfo&quot;</span><span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>Loading<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>transition<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>template<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>script setup<span class="token operator">&gt;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> reactive<span class="token punctuation">,</span> ref<span class="token punctuation">,</span> watchEffect <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue&quot;</span><span class="token punctuation">;</span>
<span class="token comment">//我们需要实现的字体消融特效的组件</span>
<span class="token keyword">import</span> Loading <span class="token keyword">from</span> <span class="token string">&quot;@/components/Loading.vue&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> props <span class="token operator">=</span> <span class="token function">defineProps</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&quot;getSuccess&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;info&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> pageInfo <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span>props<span class="token punctuation">.</span>info<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>style lang<span class="token operator">=</span><span class="token string">&quot;less&quot;</span> scoped<span class="token operator">&gt;</span>
<span class="token punctuation">.</span>loading<span class="token operator">-</span>hide <span class="token punctuation">{</span>
  <span class="token literal-property property">position</span><span class="token operator">:</span> absolute<span class="token punctuation">;</span>
  <span class="token literal-property property">top</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token literal-property property">left</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token literal-property property">width</span><span class="token operator">:</span> <span class="token number">100</span><span class="token operator">%</span><span class="token punctuation">;</span>
  <span class="token literal-property property">height</span><span class="token operator">:</span> <span class="token number">100</span><span class="token operator">%</span><span class="token punctuation">;</span>
  <span class="token literal-property property">opacity</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token literal-property property">overflow</span><span class="token operator">:</span> hidden<span class="token punctuation">;</span>
  <span class="token comment">//让加载层在最上层</span>
  z<span class="token operator">-</span>index<span class="token operator">:</span> <span class="token number">99</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">//vue中的特殊css，配合着transition标签使用，可以在vue中实现标签隐藏后的动画效果</span>
<span class="token punctuation">.</span>fade<span class="token operator">-</span>enter<span class="token operator">-</span>active<span class="token punctuation">,</span>
<span class="token punctuation">.</span>fade<span class="token operator">-</span>leave<span class="token operator">-</span>active <span class="token punctuation">{</span>
  <span class="token literal-property property">animation</span><span class="token operator">:</span> fade 2s<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token punctuation">.</span>fade<span class="token operator">-</span>enter<span class="token punctuation">,</span>
<span class="token punctuation">.</span>fade<span class="token operator">-</span>leave<span class="token operator">-</span>to <span class="token punctuation">{</span>
  <span class="token literal-property property">opacity</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
@keyframes fade <span class="token punctuation">{</span>
  <span class="token number">0</span><span class="token operator">%</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">opacity</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token number">100</span><span class="token operator">%</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">opacity</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>style<span class="token operator">&gt;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>子组件代码</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token operator">&lt;</span>template<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span>div <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">&quot;container&quot;</span><span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>div <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">&quot;text&quot;</span> ref<span class="token operator">=</span><span class="token string">&quot;textDom&quot;</span><span class="token operator">&gt;</span>
      <span class="token punctuation">{</span><span class="token punctuation">{</span> props<span class="token punctuation">.</span>pageInfo<span class="token punctuation">.</span>title <span class="token punctuation">}</span><span class="token punctuation">}</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>template<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>script setup<span class="token operator">&gt;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> nextTick<span class="token punctuation">,</span> onMounted<span class="token punctuation">,</span> ref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue&quot;</span><span class="token punctuation">;</span>
<span class="token comment">//获取父组件传过来的数据</span>
<span class="token keyword">const</span> props <span class="token operator">=</span> <span class="token function">defineProps</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">pageInfo</span><span class="token operator">:</span> Object<span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//操作dom</span>
<span class="token keyword">const</span> textDom <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//动画初始化</span>
<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">await</span> <span class="token function">nextTick</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">//修改延迟时间</span>
  textDom<span class="token punctuation">.</span>value<span class="token punctuation">.</span>style<span class="token punctuation">.</span>animationDuration <span class="token operator">=</span> props<span class="token punctuation">.</span>pageInfo<span class="token operator">?.</span>duration<span class="token punctuation">;</span>
  <span class="token comment">//           /\\S/g</span>
  textDom<span class="token punctuation">.</span>value<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> textDom<span class="token punctuation">.</span>value<span class="token punctuation">.</span>textContent<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">.</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token string">&quot;&lt;span&gt;$&amp;&lt;/span&gt;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> arr <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelectorAll</span><span class="token punctuation">(</span><span class="token string">&quot;span&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">//为动画分时添加动画</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">await</span> <span class="token function">nextTick</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>classList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;move&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token comment">/* console.log(&quot;数据是&quot;, arr[i]); */</span>
      arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>style<span class="token punctuation">.</span>animationDelay <span class="token operator">=</span> props<span class="token punctuation">.</span>pageInfo<span class="token operator">?.</span>duration<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">100</span> <span class="token operator">*</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token function">onMounted</span><span class="token punctuation">(</span>init<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>style lang<span class="token operator">=</span><span class="token string">&quot;less&quot;</span> scoped<span class="token operator">&gt;</span>
<span class="token punctuation">.</span>container <span class="token punctuation">{</span>
  <span class="token literal-property property">width</span><span class="token operator">:</span> <span class="token number">100</span><span class="token operator">%</span><span class="token punctuation">;</span>
  <span class="token literal-property property">height</span><span class="token operator">:</span> <span class="token number">100</span><span class="token operator">%</span><span class="token punctuation">;</span>
  text<span class="token operator">-</span>align<span class="token operator">:</span> center<span class="token punctuation">;</span>
  background<span class="token operator">-</span>color<span class="token operator">:</span> #<span class="token number">000</span><span class="token punctuation">;</span>
  <span class="token literal-property property">filter</span><span class="token operator">:</span> <span class="token function">contrast</span><span class="token punctuation">(</span><span class="token number">40</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token doc-comment comment">/**显示空白字符，让空白字符串仍然占据空间,保证父组件传进来的内容带空格也能占据空间**/</span>
  white<span class="token operator">-</span>space<span class="token operator">:</span> pre<span class="token operator">-</span>wrap<span class="token punctuation">;</span>
  <span class="token punctuation">.</span>text <span class="token punctuation">{</span>
    <span class="token literal-property property">width</span><span class="token operator">:</span> <span class="token number">100</span><span class="token operator">%</span><span class="token punctuation">;</span>
    <span class="token literal-property property">height</span><span class="token operator">:</span> <span class="token number">100</span><span class="token operator">%</span><span class="token punctuation">;</span>
    <span class="token literal-property property">display</span><span class="token operator">:</span> flex<span class="token punctuation">;</span>
    justify<span class="token operator">-</span>content<span class="token operator">:</span> center<span class="token punctuation">;</span>
    align<span class="token operator">-</span>items<span class="token operator">:</span> center<span class="token punctuation">;</span>
    font<span class="token operator">-</span>size<span class="token operator">:</span> 100px<span class="token punctuation">;</span>
    <span class="token literal-property property">color</span><span class="token operator">:</span> #fff<span class="token punctuation">;</span>
    <span class="token literal-property property">animation</span><span class="token operator">:</span> showup linear 0s forwards<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
@keyframes showup <span class="token punctuation">{</span>
  <span class="token number">0</span><span class="token operator">%</span> <span class="token punctuation">{</span>
    letter<span class="token operator">-</span>spacing<span class="token operator">:</span> <span class="token operator">-</span>50px<span class="token punctuation">;</span>
    <span class="token literal-property property">filter</span><span class="token operator">:</span> <span class="token function">blur</span><span class="token punctuation">(</span>10px<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token number">100</span><span class="token operator">%</span> <span class="token punctuation">{</span>
    letter<span class="token operator">-</span>spacing<span class="token operator">:</span> 10px<span class="token punctuation">;</span>
    <span class="token literal-property property">filter</span><span class="token operator">:</span> <span class="token function">blur</span><span class="token punctuation">(</span>2px<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">//烟雾消失效果</span>
<span class="token doc-comment comment">/**
这里需要进行样式的穿透，原因在于我为每一个字体包裹的span标签使用的是document来添加的，并非使用的ref，所以这个span是全局的样式，没有带上vue特殊的css id也就会导致scoped失效，所以这里需要将该样式进行样式穿透，才能让该css生效
**/</span>
<span class="token operator">:</span><span class="token function">deep</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">.</span>text <span class="token punctuation">.</span>move</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">animation</span><span class="token operator">:</span> up 2s linear forwards<span class="token punctuation">;</span>
  <span class="token comment">//默认动画执行时间</span>
  animation<span class="token operator">-</span>delay<span class="token operator">:</span> 4s<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
@keyframes up <span class="token punctuation">{</span>
  <span class="token number">100</span><span class="token operator">%</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">opacity</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token literal-property property">filter</span><span class="token operator">:</span> <span class="token function">blur</span><span class="token punctuation">(</span>40px<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token literal-property property">transform</span><span class="token operator">:</span> <span class="token function">translate</span><span class="token punctuation">(</span>500px<span class="token punctuation">,</span> <span class="token operator">-</span>300px<span class="token punctuation">)</span> <span class="token function">rotate</span><span class="token punctuation">(</span>360deg<span class="token punctuation">)</span> <span class="token function">scale</span><span class="token punctuation">(</span><span class="token number">2.5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>style<span class="token operator">&gt;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>字体消融效果的关键css样式为</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token property">filter</span><span class="token punctuation">:</span> <span class="token function">contrast</span><span class="token punctuation">(</span>40<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token property">filter</span><span class="token punctuation">:</span> <span class="token function">blur</span><span class="token punctuation">(</span>10px<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>为父元素添加filter:contrast()加强对比度，为子元素的字体添加filter:blur()的高斯模糊</p>`,7),o=[e];function c(l,i){return s(),a("div",null,o)}const u=n(t,[["render",c],["__file","yigezitixiaorongdedonghuajiazaitexiaoVue3fengzhuang.html.vue"]]);export{u as default};
