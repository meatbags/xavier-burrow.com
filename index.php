<?php get_header(); ?>

<div id='section-title' class='section active'>
  <div class='box active clickable padding-8' id='to-menu'>
    xavier burrow
  </div>
</div>

<div id='section-menu' class='section'>
  <div class='section__inner'>
    <div class='box padding-8'>
      Xavier is an animator and programmer working<br />
      in three dimensions and five senses.<br /><br />
      <a class='selectable' href='mailto:jxburrow@gmail.com'>jxburrow@gmail.com</a>
    </div>
    <div class='row margin-top grid'>
      <div class='grid__half'></div>
      <div id='to-projects' class='grid__half padding-4 box flex-centre clickable'>
        see work &rarr;
      </div>
    </div>
  </div>
</div>

<div id='section-projects' class='section'>
  <div class='section__inner projects'>
    <div class='row margin-top grid'>
      <div id='to-back' class='grid__half box clickable padding-2 flex-centre'>&larr; back</div>
      <div class='grid__half'></div>
    </div>
    <?php
      $query = new WP_Query(array(
        'post_type' => 'projects',
        'orderby' => 'menu_order'
      ));
      if ($query->have_posts()):
        while ($query->have_posts()):
            $query->the_post();
            $title = get_the_title();
            $desc = get_field('description');
            $gallery = get_field('gallery');
          ?>
          <div class='item box'>
            <?php echo $title; ?>
          </div>
          <?php
        endwhile;
      endif;
    ?>
  </div>
</div>

<?php get_footer(); ?>
