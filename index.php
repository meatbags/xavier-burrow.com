<?php get_header(); ?>

<div class='wrapper'>
  <div class='wrapper__inner'>
    <?php get_template_part('nav'); ?>
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
    <?php get_template_part('index_pane'); ?>
    <?php get_template_part('index_footer'); ?>
  </div>
</div>

<?php get_footer(); ?>
