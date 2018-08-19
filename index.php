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
        <svg width="24" height="16">
          <polygon points="1,1 23,1 23,15 1,15 1,1 12,10 23,1" style="stroke:#000;fill:transparent;stroke-width:1;" />
        </svg>
        <svg width="24" height="16">
          <polygon points="1,1 23,1 23,15 1,15 1,1 12,7 23,1" style="stroke:#000;fill:transparent;stroke-width:1;" />
        </svg>
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

<div class='project-pane'>
  <div class='project-pane__inner'>
    <div id='project-pane-close' class='back'>
      << back
    </div>
    <div class='title'>
      Title.
    </div>
    <div class='description'>
      This is the description.
    </div>
    <div class='links'>
      Project Links!
    </div>
  </div>
</div>

<div class='loading-screen'>
  <div class='loading-screen__inner'>
    loading.
  </div>
</div>

<?php get_footer(); ?>
