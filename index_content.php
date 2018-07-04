<div class='sections'>
  <?php
    $query = new WP_Query(array('post_type' => 'projects', 'orderby' => 'menu_order', 'posts_per_page' => -1));
    $i = 0;
    if ($query->have_posts()):
      while ($query->have_posts()):
        $query->the_post();
        get_template_part('index_content_project');
        if (++$i == 3) {
          get_template_part('piano');
        } elseif ($i == 6) {
          get_template_part('chess');
        }
      endwhile;
    endif;
  ?>
</div>

<?php get_template_part('business_card'); ?>
