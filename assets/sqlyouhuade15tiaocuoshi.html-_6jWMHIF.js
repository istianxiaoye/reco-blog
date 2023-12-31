import{_ as s,o as n,c as a,e}from"./app-jmEemqZF.js";const p={},o=e(`<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>sql优化是一个大家都比较关注的热门话题，无论你在面试，还是工作中，都很有可能会遇到。</p><p>如果某天你负责的某个线上接口，出现了性能问题，需要做优化。那么你首先想到的很有可能是优化sql语句，因为它的改造成本相对于代码来说也要小得多。</p><p>那么，如何优化sql语句呢？</p><h3 id="_1-避免使用select" tabindex="-1"><a class="header-anchor" href="#_1-避免使用select" aria-hidden="true">#</a> 1. 避免使用select *</h3><p>很多时候，我们写sql语句时，为了方便，喜欢直接使用<code>select *</code>，一次性查出表中所有列的数据。</p><p>在实际业务场景中，可能我们真正需要使用的只有其中一两列。查了很多数据，但是不用，白白浪费了数据库资源，比如：内存或者cpu。</p><p>此外，多查出来的数据，通过网络IO传输的过程中，也会增加数据传输的时间。</p><p>还有一个最重要的问题是：<code>select *</code>不会走<code>覆盖索引</code>，会出现大量的<code>回表</code>操作，而从导致查询sql的性能很低。</p><p>正确的做法</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">select</span> name<span class="token punctuation">,</span>age <span class="token keyword">from</span> <span class="token keyword">user</span> <span class="token keyword">where</span> id<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>sql语句查询时，只查需要用到的列，多余的列根本无需查出来。</p><h3 id="_2-用union-all代替union" tabindex="-1"><a class="header-anchor" href="#_2-用union-all代替union" aria-hidden="true">#</a> 2. 用union all代替union</h3><p>我们都知道sql语句使用<code>union</code>关键字后，可以获取排重后的数据。</p><p>而如果使用<code>union all</code>关键字，可以获取所有数据，包含重复的数据。</p><p><strong>反例：</strong></p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token punctuation">(</span><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> <span class="token keyword">user</span> <span class="token keyword">where</span> id<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">)</span>   
<span class="token keyword">union</span>   
<span class="token punctuation">(</span><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> <span class="token keyword">user</span> <span class="token keyword">where</span> id<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>排重的过程需要遍历、排序和比较，它更耗时，更消耗cpu资源。</p><p>所以如果能用union all的时候，尽量不用union。</p><p><strong>正例：</strong></p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token punctuation">(</span><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> <span class="token keyword">user</span> <span class="token keyword">where</span> id<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">)</span>   
<span class="token keyword">union</span> <span class="token keyword">all</span>  
<span class="token punctuation">(</span><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> <span class="token keyword">user</span> <span class="token keyword">where</span> id<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>除非是有些特殊的场景，比如union all之后，结果集中出现了重复数据，而业务场景中是不允许产生重复数据的，这时可以使用union。</p><h3 id="_3-小表驱动大表" tabindex="-1"><a class="header-anchor" href="#_3-小表驱动大表" aria-hidden="true">#</a> 3. 小表驱动大表</h3><p>小表驱动大表，也就是说用小表的数据集驱动大表的数据集。</p><p>假如有order和user两张表，其中order表有10000条数据，而user表有100条数据。</p><p>这时如果想查一下，所有有效的用户下过的订单列表。</p><p>可以使用<code>in</code>关键字实现：</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> <span class="token keyword">order</span>  
<span class="token keyword">where</span> user_id <span class="token operator">in</span> <span class="token punctuation">(</span><span class="token keyword">select</span> id <span class="token keyword">from</span> <span class="token keyword">user</span> <span class="token keyword">where</span> <span class="token keyword">status</span><span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>也可以使用<code>exists</code>关键字实现：</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> <span class="token keyword">order</span>  
<span class="token keyword">where</span> <span class="token keyword">exists</span> <span class="token punctuation">(</span><span class="token keyword">select</span> <span class="token number">1</span> <span class="token keyword">from</span> <span class="token keyword">user</span> <span class="token keyword">where</span> <span class="token keyword">order</span><span class="token punctuation">.</span>user_id <span class="token operator">=</span> <span class="token keyword">user</span><span class="token punctuation">.</span>id <span class="token operator">and</span> <span class="token keyword">status</span><span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>前面提到的这种业务场景，使用in关键字去实现业务需求，更加合适。</p><p>为什么呢？</p><p>因为如果sql语句中包含了in关键字，则它会优先执行in里面的<code>子查询语句</code>，然后再执行in外面的语句。如果in里面的数据量很少，作为条件查询速度更快。</p><p>而如果sql语句中包含了exists关键字，它优先执行exists左边的语句（即主查询语句）。然后把它作为条件，去跟右边的语句匹配。如果匹配上，则可以查询出数据。如果匹配不上，数据就被过滤掉了。</p><p>这个需求中，order表有10000条数据，而user表有100条数据。order表是大表，user表是小表。如果order表在左边，则用in关键字性能更好。</p><p>总结一下：</p><ul><li><code>in</code> 适用于左边大表，右边小表。</li><li><code>exists</code> 适用于左边小表，右边大表。</li></ul><p>不管是用in，还是exists关键字，其核心思想都是用小表驱动大表。</p><h3 id="_4-批量操作" tabindex="-1"><a class="header-anchor" href="#_4-批量操作" aria-hidden="true">#</a> 4. 批量操作</h3><p>如果你有一批数据经过业务处理之后，需要插入数据，该怎么办？</p><p><strong>反例：</strong></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">for</span><span class="token punctuation">(</span><span class="token class-name">Order</span> order<span class="token operator">:</span> list<span class="token punctuation">)</span><span class="token punctuation">{</span>  
   orderMapper<span class="token punctuation">.</span><span class="token function">insert</span><span class="token punctuation">(</span>order<span class="token punctuation">)</span><span class="token operator">:</span>  
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在循环中逐条插入数据。</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">insert</span> <span class="token keyword">into</span> <span class="token keyword">order</span><span class="token punctuation">(</span>id<span class="token punctuation">,</span>code<span class="token punctuation">,</span>user_id<span class="token punctuation">)</span>   
<span class="token keyword">values</span><span class="token punctuation">(</span><span class="token number">123</span><span class="token punctuation">,</span><span class="token string">&#39;001&#39;</span><span class="token punctuation">,</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>该操作需要多次请求数据库，才能完成这批数据的插入。</p><p>但众所周知，我们在代码中，每次远程请求数据库，是会消耗一定性能的。而如果我们的代码需要请求多次数据库，才能完成本次业务功能，势必会消耗更多的性能。</p><p>那么如何优化呢？</p><p><strong>正例：</strong></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>orderMapper<span class="token punctuation">.</span><span class="token function">insertBatch</span><span class="token punctuation">(</span>list<span class="token punctuation">)</span><span class="token operator">:</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>提供一个批量插入数据的方法。</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">insert</span> <span class="token keyword">into</span> <span class="token keyword">order</span><span class="token punctuation">(</span>id<span class="token punctuation">,</span>code<span class="token punctuation">,</span>user_id<span class="token punctuation">)</span>   
<span class="token keyword">values</span><span class="token punctuation">(</span><span class="token number">123</span><span class="token punctuation">,</span><span class="token string">&#39;001&#39;</span><span class="token punctuation">,</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token number">124</span><span class="token punctuation">,</span><span class="token string">&#39;002&#39;</span><span class="token punctuation">,</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token number">125</span><span class="token punctuation">,</span><span class="token string">&#39;003&#39;</span><span class="token punctuation">,</span><span class="token number">101</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这样只需要远程请求一次数据库，sql性能会得到提升，数据量越多，提升越大。</p><p>但需要注意的是，不建议一次批量操作太多的数据，如果数据太多数据库响应也会很慢。批量操作需要把握一个度，建议每批数据尽量控制在500以内。如果数据多于500，则分多批次处理。</p><h3 id="_5-多用limit" tabindex="-1"><a class="header-anchor" href="#_5-多用limit" aria-hidden="true">#</a> 5. 多用limit</h3><p>有时候，我们需要查询某些数据中的第一条，比如：查询某个用户下的第一个订单，想看看他第一次的首单时间。</p><p><strong>反例：</strong></p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">select</span> id<span class="token punctuation">,</span> create_date   
 <span class="token keyword">from</span> <span class="token keyword">order</span>   
<span class="token keyword">where</span> user_id<span class="token operator">=</span><span class="token number">123</span>   
<span class="token keyword">order</span> <span class="token keyword">by</span> create_date <span class="token keyword">asc</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>根据用户id查询订单，按下单时间排序，先查出该用户所有的订单数据，得到一个订单集合。然后在代码中，获取第一个元素的数据，即首单的数据，就能获取首单时间。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Order</span><span class="token punctuation">&gt;</span></span> list <span class="token operator">=</span> orderMapper<span class="token punctuation">.</span><span class="token function">getOrderList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token class-name">Order</span> order <span class="token operator">=</span> list<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>虽说这种做法在功能上没有问题，但它的效率非常不高，需要先查询出所有的数据，有点浪费资源。</p><p>那么，如何优化呢？</p><p><strong>正例：</strong></p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">select</span> id<span class="token punctuation">,</span> create_date   
 <span class="token keyword">from</span> <span class="token keyword">order</span>   
<span class="token keyword">where</span> user_id<span class="token operator">=</span><span class="token number">123</span>   
<span class="token keyword">order</span> <span class="token keyword">by</span> create_date <span class="token keyword">asc</span>   
<span class="token keyword">limit</span> <span class="token number">1</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用<code>limit 1</code>，只返回该用户下单时间最小的那一条数据即可。</p><blockquote><p>此外，在删除或者修改数据时，为了防止误操作，导致删除或修改了不相干的数据，也可以在sql语句最后加上limit。</p></blockquote><p>例如：</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">update</span> <span class="token keyword">order</span> <span class="token keyword">set</span> <span class="token keyword">status</span><span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">,</span>edit_time<span class="token operator">=</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>   
<span class="token keyword">where</span> id<span class="token operator">&gt;=</span><span class="token number">100</span> <span class="token operator">and</span> id<span class="token operator">&lt;</span><span class="token number">200</span> <span class="token keyword">limit</span> <span class="token number">100</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这样即使误操作，比如把id搞错了，也不会对太多的数据造成影响。</p><h3 id="_6-in中值太多" tabindex="-1"><a class="header-anchor" href="#_6-in中值太多" aria-hidden="true">#</a> 6. in中值太多</h3><p>对于批量查询接口，我们通常会使用<code>in</code>关键字过滤出数据。比如：想通过指定的一些id，批量查询出用户信息。</p><p>sql语句如下：</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">select</span> id<span class="token punctuation">,</span>name <span class="token keyword">from</span> category  
<span class="token keyword">where</span> id <span class="token operator">in</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3.</span><span class="token punctuation">.</span><span class="token number">.100000000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们不做任何限制，该查询语句一次性可能会查询出非常多的数据，很容易导致接口超时。</p><p>这时该怎么办呢？</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">select</span> id<span class="token punctuation">,</span>name <span class="token keyword">from</span> category  
<span class="token keyword">where</span> id <span class="token operator">in</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3.</span><span class="token punctuation">.</span><span class="token number">.100</span><span class="token punctuation">)</span>  
<span class="token keyword">limit</span> <span class="token number">500</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以在sql中对数据用limit做限制。</p><p>不过我们更多的是要在业务代码中加限制，伪代码如下：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Category</span><span class="token punctuation">&gt;</span></span> <span class="token function">getCategory</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">&gt;</span></span> ids<span class="token punctuation">)</span> <span class="token punctuation">{</span>  
   <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token class-name">CollectionUtils</span><span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span>ids<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>  
      <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>  
   <span class="token punctuation">}</span>  
   <span class="token keyword">if</span><span class="token punctuation">(</span>ids<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">500</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>  
      <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">BusinessException</span><span class="token punctuation">(</span><span class="token string">&quot;一次最多允许查询500条记录&quot;</span><span class="token punctuation">)</span>  
   <span class="token punctuation">}</span>  
   <span class="token keyword">return</span> mapper<span class="token punctuation">.</span><span class="token function">getCategoryList</span><span class="token punctuation">(</span>ids<span class="token punctuation">)</span><span class="token punctuation">;</span>  
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>还有一个方案就是：如果ids超过500条记录，可以分批用多线程去查询数据。每批只查500条记录，最后把查询到的数据汇总到一起返回。</p><p>不过这只是一个临时方案，不适合于ids实在太多的场景。因为ids太多，即使能快速查出数据，但如果返回的数据量太大了，网络传输也是非常消耗性能的，接口性能始终好不到哪里去。</p><h3 id="_7-增量查询" tabindex="-1"><a class="header-anchor" href="#_7-增量查询" aria-hidden="true">#</a> 7. 增量查询</h3><p>有时候，我们需要通过远程接口查询数据，然后同步到另外一个数据库。</p><p><strong>反例：</strong></p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> <span class="token keyword">user</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果直接获取所有的数据，然后同步过去。这样虽说非常方便，但是带来了一个非常大的问题，就是如果数据很多的话，查询性能会非常差。</p><p>这时该怎么办呢？</p><p><strong>正例：</strong></p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> <span class="token keyword">user</span>   
<span class="token keyword">where</span> id<span class="token operator">&gt;</span><span class="token comment">#{lastId} and create_time &gt;= #{lastCreateTime}   </span>
<span class="token keyword">limit</span> <span class="token number">100</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>按id和时间升序，每次只同步一批数据，这一批数据只有100条记录。每次同步完成之后，保存这100条数据中最大的id和时间，给同步下一批数据的时候用。</p><p>通过这种增量查询的方式，能够提升单次查询的效率。</p><h3 id="_8-高效的分页" tabindex="-1"><a class="header-anchor" href="#_8-高效的分页" aria-hidden="true">#</a> 8. 高效的分页</h3><p>有时候，列表页在查询数据时，为了避免一次性返回过多的数据影响接口性能，我们一般会对查询接口做分页处理。</p><p>在mysql中分页一般用的<code>limit</code>关键字：</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">select</span> id<span class="token punctuation">,</span>name<span class="token punctuation">,</span>age   
<span class="token keyword">from</span> <span class="token keyword">user</span> <span class="token keyword">limit</span> <span class="token number">10</span><span class="token punctuation">,</span><span class="token number">20</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果表中数据量少，用limit关键字做分页，没啥问题。但如果表中数据量很多，用它就会出现性能问题。</p><p>比如现在分页参数变成了：</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">select</span> id<span class="token punctuation">,</span>name<span class="token punctuation">,</span>age   
<span class="token keyword">from</span> <span class="token keyword">user</span> <span class="token keyword">limit</span> <span class="token number">1000000</span><span class="token punctuation">,</span><span class="token number">20</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>mysql会查到1000020条数据，然后丢弃前面的1000000条，只查后面的20条数据，这个是非常浪费资源的。</p><p>那么，这种海量数据该怎么分页呢？</p><p>优化sql：</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">select</span> id<span class="token punctuation">,</span>name<span class="token punctuation">,</span>age   
<span class="token keyword">from</span> <span class="token keyword">user</span> <span class="token keyword">where</span> id <span class="token operator">&gt;</span> <span class="token number">1000000</span> <span class="token keyword">limit</span> <span class="token number">20</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>先找到上次分页最大的id，然后利用id上的索引查询。不过该方案，要求id是连续的，并且有序的。</p><p>还能使用<code>between</code>优化分页。</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">select</span> id<span class="token punctuation">,</span>name<span class="token punctuation">,</span>age   
<span class="token keyword">from</span> <span class="token keyword">user</span> <span class="token keyword">where</span> id <span class="token operator">between</span> <span class="token number">1000000</span> <span class="token operator">and</span> <span class="token number">1000020</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>需要注意的是between要在唯一索引上分页，不然会出现每页大小不一致的问题。</p><h3 id="_9-用连接查询代替子查询" tabindex="-1"><a class="header-anchor" href="#_9-用连接查询代替子查询" aria-hidden="true">#</a> 9. 用连接查询代替子查询</h3><p>mysql中如果需要从两张以上的表中查询出数据的话，一般有两种实现方式：<code>子查询</code> 和 <code>连接查询</code>。</p><p>子查询的例子如下：</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> <span class="token keyword">order</span>  
<span class="token keyword">where</span> user_id <span class="token operator">in</span> <span class="token punctuation">(</span><span class="token keyword">select</span> id <span class="token keyword">from</span> <span class="token keyword">user</span> <span class="token keyword">where</span> <span class="token keyword">status</span><span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>子查询语句可以通过<code>in</code>关键字实现，一个查询语句的条件落在另一个select语句的查询结果中。程序先运行在嵌套在最内层的语句，再运行外层的语句。</p><p>子查询语句的优点是简单，结构化，如果涉及的表数量不多的话。</p><p>但缺点是mysql执行子查询时，需要创建临时表，查询完毕后，需要再删除这些临时表，有一些额外的性能消耗。</p><p>这时可以改成连接查询。具体例子如下：</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">select</span> o<span class="token punctuation">.</span><span class="token operator">*</span> <span class="token keyword">from</span> <span class="token keyword">order</span> o  
<span class="token keyword">inner</span> <span class="token keyword">join</span> <span class="token keyword">user</span> u <span class="token keyword">on</span> o<span class="token punctuation">.</span>user_id <span class="token operator">=</span> u<span class="token punctuation">.</span>id  
<span class="token keyword">where</span> u<span class="token punctuation">.</span><span class="token keyword">status</span><span class="token operator">=</span><span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_10-join的表不宜过多" tabindex="-1"><a class="header-anchor" href="#_10-join的表不宜过多" aria-hidden="true">#</a> 10. join的表不宜过多</h3><p>根据阿里巴巴开发者手册的规定，join表的数量不应该超过<code>3</code>个。</p><p>如果join太多，mysql在选择索引的时候会非常复杂，很容易选错索引。</p><p>并且如果没有命中中，nested loop join 就是分别从两个表读一行数据进行两两对比，复杂度是 n^2。</p><p>所以我们应该尽量控制join表的数量。</p><p><strong>正例：</strong></p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">select</span> a<span class="token punctuation">.</span>name<span class="token punctuation">,</span>b<span class="token punctuation">.</span>name<span class="token punctuation">.</span>c<span class="token punctuation">.</span>name<span class="token punctuation">,</span>a<span class="token punctuation">.</span>d_name   
<span class="token keyword">from</span> a   
<span class="token keyword">inner</span> <span class="token keyword">join</span> b <span class="token keyword">on</span> a<span class="token punctuation">.</span>id <span class="token operator">=</span> b<span class="token punctuation">.</span>a_id  
<span class="token keyword">inner</span> <span class="token keyword">join</span> c <span class="token keyword">on</span> c<span class="token punctuation">.</span>b_id <span class="token operator">=</span> b<span class="token punctuation">.</span>id
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果实现业务场景中需要查询出另外几张表中的数据，可以在a、b、c表中<code>冗余专门的字段</code>，比如：在表a中冗余d_name字段，保存需要查询出的数据。</p><p>不过我之前也见过有些ERP系统，并发量不大，但业务比较复杂，需要join十几张表才能查询出数据。</p><p>所以join表的数量要根据系统的实际情况决定，不能一概而论，尽量越少越好。</p><h3 id="_11-join时要注意" tabindex="-1"><a class="header-anchor" href="#_11-join时要注意" aria-hidden="true">#</a> 11. join时要注意</h3><p>我们在涉及到多张表联合查询的时候，一般会使用<code>join</code>关键字。</p><p>而join使用最多的是left join和inner join。</p><ul><li><code>left join</code>：求两个表的交集外加左表剩下的数据。</li><li><code>inner join</code>：求两个表交集的数据。</li></ul><p>使用inner join的示例如下：</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">select</span> o<span class="token punctuation">.</span>id<span class="token punctuation">,</span>o<span class="token punctuation">.</span>code<span class="token punctuation">,</span>u<span class="token punctuation">.</span>name   
<span class="token keyword">from</span> <span class="token keyword">order</span> o   
<span class="token keyword">inner</span> <span class="token keyword">join</span> <span class="token keyword">user</span> u <span class="token keyword">on</span> o<span class="token punctuation">.</span>user_id <span class="token operator">=</span> u<span class="token punctuation">.</span>id  
<span class="token keyword">where</span> u<span class="token punctuation">.</span><span class="token keyword">status</span><span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果两张表使用inner join关联，mysql会自动选择两张表中的小表，去驱动大表，所以性能上不会有太大的问题。</p><p>使用left join的示例如下：</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">select</span> o<span class="token punctuation">.</span>id<span class="token punctuation">,</span>o<span class="token punctuation">.</span>code<span class="token punctuation">,</span>u<span class="token punctuation">.</span>name   
<span class="token keyword">from</span> <span class="token keyword">order</span> o   
<span class="token keyword">left</span> <span class="token keyword">join</span> <span class="token keyword">user</span> u <span class="token keyword">on</span> o<span class="token punctuation">.</span>user_id <span class="token operator">=</span> u<span class="token punctuation">.</span>id  
<span class="token keyword">where</span> u<span class="token punctuation">.</span><span class="token keyword">status</span><span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果两张表使用left join关联，mysql会默认用left join关键字左边的表，去驱动它右边的表。如果左边的表数据很多时，就会出现性能问题。</p><blockquote><p>要特别注意的是在用left join关联查询时，左边要用小表，右边可以用大表。如果能用inner join的地方，尽量少用left join。</p></blockquote><h3 id="_12-控制索引的数量" tabindex="-1"><a class="header-anchor" href="#_12-控制索引的数量" aria-hidden="true">#</a> 12. 控制索引的数量</h3><p>众所周知，索引能够显著的提升查询sql的性能，但索引数量并非越多越好。</p><p>因为表中新增数据时，需要同时为它创建索引，而索引是需要额外的存储空间的，而且还会有一定的性能消耗。</p><p>阿里巴巴的开发者手册中规定，单表的索引数量应该尽量控制在<code>5</code>个以内，并且单个索引中的字段数不超过<code>5</code>个。</p><p>mysql使用的B+树的结构来保存索引的，在insert、update和delete操作时，需要更新B+树索引。如果索引过多，会消耗很多额外的性能。</p><p>那么，问题来了，如果表中的索引太多，超过了5个该怎么办？</p><p>这个问题要辩证的看，如果你的系统并发量不高，表中的数据量也不多，其实超过5个也可以，只要不要超过太多就行。</p><p>但对于一些高并发的系统，请务必遵守单表索引数量不要超过5的限制。</p><p>那么，高并发系统如何优化索引数量？</p><p>能够建联合索引，就别建单个索引，可以删除无用的单个索引。</p><p>将部分查询功能迁移到其他类型的数据库中，比如：Elastic Seach、HBase等，在业务表中只需要建几个关键索引即可。</p><h3 id="_13-选择合理的字段类型" tabindex="-1"><a class="header-anchor" href="#_13-选择合理的字段类型" aria-hidden="true">#</a> 13. 选择合理的字段类型</h3><p><code>char</code>表示固定字符串类型，该类型的字段存储空间的固定的，会浪费存储空间。</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">alter</span> <span class="token keyword">table</span> <span class="token keyword">order</span>   
<span class="token keyword">add</span> <span class="token keyword">column</span> code <span class="token keyword">char</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code>varchar</code>表示变长字符串类型，该类型的字段存储空间会根据实际数据的长度调整，不会浪费存储空间。</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">alter</span> <span class="token keyword">table</span> <span class="token keyword">order</span>   
<span class="token keyword">add</span> <span class="token keyword">column</span> code <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果是长度固定的字段，比如用户手机号，一般都是11位的，可以定义成char类型，长度是11字节。</p><p>但如果是企业名称字段，假如定义成char类型，就有问题了。</p><p>如果长度定义得太长，比如定义成了200字节，而实际企业长度只有50字节，则会浪费150字节的存储空间。</p><p>如果长度定义得太短，比如定义成了50字节，但实际企业名称有100字节，就会存储不下，而抛出异常。</p><p>所以建议将企业名称改成varchar类型，变长字段存储空间小，可以节省存储空间，而且对于查询来说，在一个相对较小的字段内搜索效率显然要高些。</p><p>我们在选择字段类型时，应该遵循这样的原则：</p><ol><li>能用数字类型，就不用字符串，因为字符的处理往往比数字要慢。</li><li>尽可能使用小的类型，比如：用bit存布尔值，用tinyint存枚举值等。</li><li>长度固定的字符串字段，用char类型。</li><li>长度可变的字符串字段，用varchar类型。</li><li>金额字段用decimal，避免精度丢失问题。</li></ol><p>还有很多原则，这里就不一一列举了。</p><h3 id="_14-提升group-by的效率" tabindex="-1"><a class="header-anchor" href="#_14-提升group-by的效率" aria-hidden="true">#</a> 14. 提升group by的效率</h3><p>我们有很多业务场景需要使用<code>group by</code>关键字，它主要的功能是去重和分组。</p><p>通常它会跟<code>having</code>一起配合使用，表示分组后再根据一定的条件过滤数据。</p><p><strong>反例：</strong></p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">select</span> user_id<span class="token punctuation">,</span>user_name <span class="token keyword">from</span> <span class="token keyword">order</span>  
<span class="token keyword">group</span> <span class="token keyword">by</span> user_id  
<span class="token keyword">having</span> user_id <span class="token operator">&lt;=</span> <span class="token number">200</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种写法性能不好，它先把所有的订单根据用户id分组之后，再去过滤用户id大于等于200的用户。</p><p>分组是一个相对耗时的操作，为什么我们不先缩小数据的范围之后，再分组呢？</p><p><strong>正例：</strong></p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">select</span> user_id<span class="token punctuation">,</span>user_name <span class="token keyword">from</span> <span class="token keyword">order</span>  
<span class="token keyword">where</span> user_id <span class="token operator">&lt;=</span> <span class="token number">200</span>  
<span class="token keyword">group</span> <span class="token keyword">by</span> user_id
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用where条件在分组前，就把多余的数据过滤掉了，这样分组时效率就会更高一些。</p><blockquote><p>其实这是一种思路，不仅限于group by的优化。我们的sql语句在做一些耗时的操作之前，应尽可能缩小数据范围，这样能提升sql整体的性能。</p></blockquote><h3 id="_15-索引优化" tabindex="-1"><a class="header-anchor" href="#_15-索引优化" aria-hidden="true">#</a> 15. 索引优化</h3><p>sql优化当中，有一个非常重要的内容就是：<code>索引优化</code>。</p><p>很多时候sql语句，走了索引，和没有走索引，执行效率差别很大。所以索引优化被作为sql优化的首选。</p><p>索引优化的第一步是：检查sql语句有没有走索引。</p><p>那么，如何查看sql走了索引没？</p><p>可以使用<code>explain</code>命令，查看mysql的执行计划。</p>`,176),t=[o];function l(c,i){return n(),a("div",null,t)}const d=s(p,[["render",l],["__file","sqlyouhuade15tiaocuoshi.html.vue"]]);export{d as default};
