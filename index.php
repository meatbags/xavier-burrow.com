<?php get_header(); ?>

<div id='section-title' class='section active'>
  <div class='box active clickable padding-8' id='to-menu'>
    xavier burrow
  </div>
</div>

<div id='section-menu' class='section'>
  <div class='section__inner desc'>
    <div class='box padding-8 desc__p'>
      Xavier Burrow is an animator and programmer working<br />
      in three dimensions and five senses.<br /><br />
      <a class='selectable' href='mailto:jxburrow@gmail.com'>jxburrow@gmail.com</a>
    </div>
    <div class='row margin-top grid desc__link'>
      <div class='grid__half'></div>
      <div id='to-projects' class='grid__half padding-4 box flex-centre clickable'>
        recent projects &rarr;
      </div>
    </div>
  </div>
</div>

<div id='section-projects' class='section'>
  <div class='section__inner projects'>
    <div class='row margin-top grid'>
      <div class='to-back grid__half box clickable padding-2 flex-centre'>&larr; back</div>
      <div class='grid__half'></div>
    </div>
    <?php
      $query = new WP_Query(array(
        'post_type' => 'projects',
        'orderby' => 'menu_order',
        'posts_per_page' => -1
      ));
      $i = 1;
      if ($query->have_posts()):
        while ($query->have_posts()):
            $query->the_post();
            $title = get_the_title();
            $desc = get_field('description');
            $gallery = get_field('gallery');
            $links = get_field('links');
          ?>
          <div class='item box'>
            <div class='item__title'>
              <?php echo $title; ?>
            </div>
            <div class='item__body'>
              <?php echo $desc; ?>
            </div>
            <div class='item__links'>
              <?php foreach($links as $link): ?>
                <a class='link' href='<?php echo $link['url']; ?>' target='_blank'><?php echo $link['label']; ?></a>
              <?php endforeach; ?>
            </div>
          </div>
        <?php
          if ($i == 3 || $i == 6):
          ?>
            <div class='space font-large'>
              &#9675;
            </div>
          <?php
            if ($i == 3):
              get_template_part('piano'); ?>
              <div class='space font-large'>&#9675;</div>
              <?php
            elseif ($i == 6):
              get_template_part('chess'); ?>
              <div class='space font-large'>&#9675;</div>
            <?php
            endif;
          endif;
          $i += 1;
        endwhile;
      endif;
    ?>
    <div class='row grid'>
      <div class='to-back grid__half box clickable padding-2 flex-centre'>&larr; back</div>
      <div class='grid__half'></div>
    </div>
  </div>
</div>

<?php get_footer(); ?>
