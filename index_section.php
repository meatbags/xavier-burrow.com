<?php
  $title = get_the_title();
  $desc = get_field('description');
  $image = get_field('image');
  $video = get_field('video');
  $links = get_field('links');
  $id = get_the_ID();
?>

<div class='section'>
  <div class='section__inner'>
    <div class='section-title'><?php echo $title; ?>.</div>
    <?php if ($desc): ?>
      <div class='section-description'><?php echo $desc; ?></div>
    <?php endif;
      if ($links): ?>
      <div class='section-links'>
        <?php foreach($links as $link): ?>
          <a class='link' href='<?php echo $link['url']; ?>' target='_blank'><?php echo $link['label']; ?></a>
        <?php endforeach; ?>
      </div>
    <?php endif;
      if ($image):
        $target = 'image-' . $id;
        ?>
      <div id='<?php echo $target; ?>' class='section-image'>
        <img data-target='<?php echo '#' . $target; ?>' src='<?php echo $image['url']; ?>' />
      </div>
    <?php endif;
      if ($video): ?>
      <div class='section-video'>
        <?php echo $video; ?>
      </div>
    <?php endif; ?>
  </div>
</div>
