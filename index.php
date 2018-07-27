<?php get_header(); ?>
<div id='sections-current-image' class='sections-image'></div>

<?php get_template_part('app/computer-ui'); ?>

<div class='menu'>
  <div id='menu-target' class='menu__inner'>
    <div class='item'>
      COMING SOON
    </div>
  </div>
</div>

<div class='wrapper'>
  <div class='wrapper__inner'>
    <div id='sections-target' class='sections display-none'>
      <div class='sections__inner'>
        <?php
          $query = new WP_Query(array('post_type' => 'projects', 'orderby' => 'menu_order', 'posts_per_page' => -1));
          if ($query->have_posts()):
            while ($query->have_posts()):
              $query->the_post();
              get_template_part('index_project');
            endwhile;
          endif;
        ?>
      </div>
    </div>

    <?php get_template_part('app/piano'); ?>
    <?php get_template_part('app/chess'); ?>
    <?php get_template_part('app/business_card'); ?>
    <?php get_template_part('app/logo'); ?>
  </div>
</div>

<?php get_footer(); ?>
