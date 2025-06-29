<!-- 引入 jQuery -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script>
$(document).ready(function() {
  let currentIndex = 0;
  const $images = $(".slides img");
  const total = $images.length;

  // 自动轮播
  let timer = setInterval(nextSlide, 3000);

  // 下一张函数
  function nextSlide() {
    $images.eq(currentIndex).removeClass("active");
    currentIndex = (currentIndex + 1) % total;
    $images.eq(currentIndex).addClass("active");
    updateDots();
  }

  // 更新指示点
  function updateDots() {
    $(".dot").removeClass("active");
    $(".dot[data-index=" + currentIndex + "]").addClass("active");
  }

  // 按钮点击事件
  $(".next").click(nextSlide);
  $(".prev").click(function() {
    $images.eq(currentIndex).removeClass("active");
    currentIndex = (currentIndex - 1 + total) % total;
    $images.eq(currentIndex).addClass("active");
    updateDots();
  });

  // 指示点点击
  $(".dot").click(function() {
    const index = $(this).data("index");
    $images.eq(currentIndex).removeClass("active");
    currentIndex = index;
    $images.eq(currentIndex).addClass("active");
    updateDots();
  });

  // 鼠标悬停暂停
  $(".carousel").hover(
    () => clearInterval(timer),
    () => timer = setInterval(nextSlide, 3000)
  );
});
</script>
