// 等待页面加载完成
document.addEventListener('DOMContentLoaded', function() {
  // 初始化轮播图
  function initCarousel() {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;
    
    const images = carousel.querySelectorAll('.slides img');
    const dots = carousel.querySelectorAll('.dot');
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');
    
    let currentIndex = 0;
    let timer;
    
    // 更新当前显示的幻灯片
    function updateSlide() {
      // 隐藏所有图片
      images.forEach(img => img.classList.remove('active'));
      // 显示当前图片
      images[currentIndex].classList.add('active');
      
      // 更新指示点
      dots.forEach(dot => dot.classList.remove('active'));
      dots[currentIndex].classList.add('active');
    }
    
    // 下一张幻灯片
    function nextSlide() {
      currentIndex = (currentIndex + 1) % images.length;
      updateSlide();
    }
    
    // 上一张幻灯片
    function prevSlide() {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateSlide();
    }
    
    // 自动轮播
    function startAutoPlay() {
      timer = setInterval(nextSlide, 5000); // 5秒切换一次
    }
    
    // 停止自动轮播
    function stopAutoPlay() {
      clearInterval(timer);
    }
    
    // 事件监听
    prevBtn.addEventListener('click', () => {
      prevSlide();
      stopAutoPlay();
      startAutoPlay();
    });
    
    nextBtn.addEventListener('click', () => {
      nextSlide();
      stopAutoPlay();
      startAutoPlay();
    });
    
    dots.forEach(dot => {
      dot.addEventListener('click', function() {
        currentIndex = parseInt(this.dataset.index);
        updateSlide();
        stopAutoPlay();
        startAutoPlay();
      });
    });
    
    // 鼠标悬停暂停轮播
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
    
    // 触摸滑动支持（移动设备）
    let touchStartX = 0;
    carousel.addEventListener('touchstart', e => {
      touchStartX = e.touches[0].clientX;
    });
    
    carousel.addEventListener('touchend', e => {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;
      
      if (diff > 50) { // 向右滑动
        nextSlide();
      } else if (diff < -50) { // 向左滑动
        prevSlide();
      }
    });
    
    // 开始自动轮播
    startAutoPlay();
  }
  
  // 初始化轮播图
  initCarousel();
});
