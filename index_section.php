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
    <div class='image-card'>
      <?php if ($image): ?>
        <img src='<?php echo $image['url']; ?>'/>
      <?php endif; ?>
    </div>
    <!--
    <div class='section-title'>
      <?php if ($links): ?>
        <a class='link' href='<?php echo $links[0]['url']; ?>' target='_blank'>
          <?php echo $title; ?>.
        </a>
      <?php else: ?>
        <?php echo $title; ?>.
      <?php endif; ?>
    </div>
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
        $imageId = 'image-' . $id;
        $wrapperId = 'wrapper-' . $id;
        ?>
      <div id='<?php echo $wrapperId; ?>' data-target='<?php echo '#' . $imageId; ?>' class='section-image'>
        <img id='<?php echo $imageId; ?>' data-target='<?php echo '#' . $wrapperId; ?>' src='<?php echo $image['url']; ?>' />
      </div>
    <?php endif;
      if ($video): ?>
      <div class='section-video'>
        <div class='section-video__inner'>
          <?php echo $video; ?>
        </div>
      </div>
    <?php endif; ?>
    -->
  </div>
</div>
