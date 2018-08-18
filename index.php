<?php get_header(); ?>

<div class='wrapper'>
  <div class='wrapper__inner'>
    <div class='title'>Xavier Burrow</div>
    <div class='filters'>
      <div class='item'>code</div>
      <div class='item'>web</div>
      <div class='item'>art</div>
    </div>
    <div id='sections-target' class='sections'>
      <?php
        $query = new WP_Query(array('post_type' => 'projects', 'orderby' => 'menu_order', 'posts_per_page' => -1));
        if ($query->have_posts()) {
          while ($query->have_posts()) {
            $query->the_post();
            get_template_part('index_section');
          }
        }
      ?>
    </div>
  </div>
</div>

<<<<<<< HEAD
=======
<div class='contact-box'>
  <div class='contact-box__header'>contact.</div>
  <div class='contact-box__contact'>
    <div class='email'>
      <a href='mailto:jxburrow@gmail.com'>jxburrow@gmail.com</a> <a target='_blank' href='https://www.instagram.com/xavebabes'>insta</a>
    </div>
  </div>
</div>
<!-- <div class='more-box'>&darr;</div> -->

<div class='canvas-wrapper'></div>

<div class='background-image dimmed'>
  <img src='<?php echo get_template_directory_uri(); ?>/lib/img/background-grey.jpg'/>
</div>
<div class='background-selected-image'>
  <div class='pane active'></div>
  <div class='pane'></div>
</div>
<div class='background-fill'></div>
>>>>>>> c5ef25f3b88fda9bffc8d17f98eada20c1a31fb4
<div class='loading-screen'>
  <div class='loading-screen__inner'>
    loading.
  </div>
</div>

<?php get_footer(); ?>
