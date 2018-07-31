<?php get_header(); ?>

<div class='wrapper'>
  <div class='wrapper__inner'>
    <div class='menu'>
      <div class='menu__inner'>
        <div class='menu-title'>xavier burrow</div>
        <div class='menu-list'>
          <div data-target='#section-code' class='item active'>code</div>
          <div data-target='#section-art' class='item'>art</div>
          <div data-target='#section-fun' class='item'>fun</div>
        </div>
      </div>
    </div>
    <div id='sections-target' class='sections'>
      <div id='section-code' class='section-wrapper active'>
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
      <div id='section-art' class='section-wrapper'>
        // art loads here
      </div>
      <div id='section-fun' class='section-wrapper'>
        // fun loads here
      </div>
    </div>
    <div class='contact-box'>
      <div class='contact-box__header'>contact.</div>
      <div class='contact-box__contact'>
        <div class='email'>
          <a href='mailto:jxburrow@gmail.com'>jxburrow@gmail.com</a> <a target='_blank' href='https://www.instagram.com/xavebabes'>insta</a>
        </div>
      </div>
    </div>
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
<div class='background-fill'></div>
<div class='loading-screen'>loading.</div>

<?php get_footer(); ?>
