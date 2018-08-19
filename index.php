<?php get_header(); ?>

<div class='wrapper'>
  <div class='wrapper__inner'>
    <div class='nav'>
      <div class='title'>
        xavier burrow.
      </div>
      <div class='filters'>
        <div class='label'>filter:</div>
        <div class='item active'>code</div>
        <div class='item active'>web</div>
        <div class='item active'>video</div>
        <div class='item active'>art</div>
      </div>
      <div class='contact'>
        about<br />
        &#9993;&#xFE0E;
      </div>
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
