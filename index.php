<?php get_header(); ?>

<div class='wrapper'>
  <div class='wrapper__inner'>
    <div class='nav'>
      <div class='title'>
        xavier burrow.
      </div>
      <div class='filters'>
        <div class='label'>filter:</div>
        <div data-filter='code' class='item active'>code</div>
        <div data-filter='web' class='item active'>web</div>
        <div data-filter='video' class='item active'>video</div>
        <div data-filter='art' class='item active'>art</div>
        <div data-filter='clear' class='item active dimmed'>clear</div>
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
    <div class='footer'>
      <a href='mailto:jxburrow@gmail.com'>jxburrow@gmail.com</a>
      <a href='https://www.instagram.com/xavebabes/' target='_blank'>insta</a>
    </div>
  </div>
</div>

<div class='project-pane'>
  <div class='project-pane__inner'>
    <div class='back project-pane-close'>&larr; back</div>
    <div class='title'></div>
    <div class='description'></div>
    <div class='video'></div>
    <div class='image'></div>
    <br /><br /><br /><br />
    <br /><br /><br />
  </div>
</div>

<div class='loading-screen'>
  <div class='loading-screen__inner'>
    loading.
  </div>
</div>

<?php get_footer(); ?>
