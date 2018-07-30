<?php get_header(); ?>

<div class='wrapper'>
  <div class='wrapper__inner'>
    <div class='menu'>
      <div class='menu-title'>xavier burrow</div>
      <div class='menu-list'>
        <div class='item'>code.</div>
        <div class='item'>art.</div>
        <div class='item'>fun.</div>
      </div>
    </div>
    <div id='sections-target' class='sections'>
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
    <div class='contact-box'>contact.</div>
  </div>
</div>

<?php //get_template_part('app/computer-ui'); ?>
<?php //get_template_part('app/piano'); ?>
<?php //get_template_part('app/chess'); ?>
<?php //get_template_part('app/business_card'); ?>
<?php //get_template_part('app/logo'); ?>

<div class='background-image'>
  <img src='<?php echo get_template_directory_uri(); ?>/lib/img/background-grey.jpg'/>
</div>


<?php get_footer(); ?>
