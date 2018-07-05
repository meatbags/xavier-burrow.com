<?php
  $title = get_the_title();
  $desc = get_field('description');
  $gallery = get_field('gallery');
  $links = get_field('links');
?>

<div class='section'>
  <div class='section__inner'>
    <div class='section-header'>
      <div class='section-title'><?php echo $title; ?></div>
    </div>
    <div class='section-body'>
      <div class='section-description'>
        <?php echo $desc; ?>
      </div>
      <?php if ($gallery): ?>
        <div class='section-gallery'>
          <div class='section-gallery__thumbs'>
            <?php foreach($gallery as $img):
              if (is_array($img) && array_key_exists('sizes', $img)):
                $thumb = $img['sizes']['thumbnail'];
                $src = $img['sizes']['large'];
              ?>
                <img src='<?php echo $thumb; ?>' data-src='<?php echo $thumb; ?>'>
              <?php
                endif;
              endforeach;
            ?>
          </div>
        </div>
      <?php endif; ?>
      <div class='section-links'>
        <?php foreach($links as $link): ?>
          <a class='link' href='<?php echo $link['url']; ?>' target='_blank'><?php echo $link['label']; ?></a>
        <?php endforeach; ?>
      </div>
    </div>
  </div>
</div>
