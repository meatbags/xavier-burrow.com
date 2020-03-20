<?php get_header(); ?>

<div class='canvas-wrapper'>
  <div id='canvas-target' class='canvas-wrapper__inner'></div>
</div>

<div class='wrapper'>
  <div class='wrapper__inner'>
    <div class='description'>
      <?php
      $query = new WP_Query('pagename=about');
      if ($query->have_posts()) {
        while ($query->have_posts()) {
          $query->the_post();
          echo get_the_content();
        }
      }
      wp_reset_postdata();
      ?>
    </div>
    <div class='menu'>
      <div class='menu__inner'>
        <div class='menu__item' data-target='view-projects'>selected work</div>
        &nbsp;&nbsp;|&nbsp;&nbsp;
        <div class='menu__item' data-target='view-contact'>contact</div>
      </div>
    </div>

    <!--
      <?php
        $query = new WP_Query(array('post_type' => 'projects', 'orderby' => 'menu_order', 'posts_per_page' => -1));
        if ($query->have_posts()) {
          while ($query->have_posts()) {
            $query->the_post();
            echo get_the_title() . '<br>';
          }
        }
      ?>
    -->
  </div>
</div>

<?php get_footer(); ?>
