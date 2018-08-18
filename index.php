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

<div class='loading-screen'>
  <div class='loading-screen__inner'>
    loading.
  </div>
</div>

<?php get_footer(); ?>
