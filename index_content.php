
<div class='sections'>
  <div class='section'>
    <div class='section__inner'>
      Xavier Burrow is an animator and programmer working<br />
      in three dimensions and five senses.<br /><br />
      <a class='selectable' href='mailto:jxburrow@gmail.com'>jxburrow@gmail.com</a>
    </div>
  </div>

  <?php
    $query = new WP_Query(array('post_type' => 'projects', 'orderby' => 'menu_order', 'posts_per_page' => -1));
    $i = 1;
    $end = $query->post_count;

    if ($query->have_posts()):
      while ($query->have_posts()):
          $query->the_post();
          $title = get_the_title();
          $desc = get_field('description');
          $gallery = get_field('gallery');
          $links = get_field('links');
          $classes = '';
          if ($i == 1 || $i == 4 || $i == 7) {
            $classes = 'open';
          } else if ($i == 3 || $i == 6 || $i == $end) {
            $classes = 'close margin-bottom';
          }
        ?>
        <div class='section <?php echo $classes; ?>'>
          <div class='section__inner'>
            <div class='section-title'><?php echo $title; ?></div>
            <div class='section-description'><?php echo $desc; ?></div>
            <div class='section-links'>
              <?php foreach($links as $link): ?>
                <a class='link' href='<?php echo $link['url']; ?>' target='_blank'><?php echo $link['label']; ?></a>
              <?php endforeach; ?>
            </div>
          </div>
        </div>
        <?php if ($i == 3 || $i == 6): ?>
          <div class='space font-large'>&#9675;</div>
        <?php if ($i == 3):
            get_template_part('piano'); ?>
            <div class='space font-large'>&#9675;</div>
        <?php elseif ($i == 6):
            get_template_part('chess'); ?>
            <div class='space font-large'>&#9675;</div>
        <?php
          endif;
        endif;
        $i += 1;
      endwhile;
    endif;
  ?>
</div>
