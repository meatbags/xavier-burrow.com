<div id='sections-target' class='sections display-none'>
  <div class='sections__inner'>
    <?php
      $query = new WP_Query(array('post_type' => 'projects', 'orderby' => 'menu_order', 'posts_per_page' => -1));
      if ($query->have_posts()):
        while ($query->have_posts()):
          $query->the_post();
          get_template_part('index_content_project');
        endwhile;
      endif;
    ?>
  </div>
</div>

<?php get_template_part('piano'); ?>
<?php get_template_part('chess'); ?>
<?php get_template_part('business_card'); ?>
<?php get_template_part('logo'); ?>
