<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'iplasmic_meme2');

/** MySQL database username */
define('DB_USER', 'iplasmic2');

/** MySQL database password */
define('DB_PASSWORD', 'zavave2yt');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'zmHa7o,%ho)<^8O5<<McqFe|U-(D78WP([um,MVKY/^omL$*=4m2|[t+QnS~6m%.');
define('SECURE_AUTH_KEY',  '$`4z1n1{K$U&~x%BIy/uAUm?UCrBl@k4lB3G>C#44>y* 60j_w2NV|$ai}nN@Y!4');
define('LOGGED_IN_KEY',    '##f%<&vapUXN^]oO)!_#19B}So}%y~}L~7W~c;[;_.-SCt?+a$FxS1G E?N&:/4E');
define('NONCE_KEY',        ':k`Kv7|asu!@1J)4}z3zC+=qZZ?3GK7~dA?|p1ZC#nmgKTu!N8:)>R(G5|rma8?#');
define('AUTH_SALT',        ':[+=)pq}jsTuivgB049uVJ(g_}#+h!m@[v~>-;OdYAw:o|8|2d8`S69T7{vYa)xf');
define('SECURE_AUTH_SALT', '`cHYSf;,}0e;Pao$Ipm!IekQctFCnMJ!Aq$zp^bkHo{1]$|jSC2s#=n+9RV,1;Eq');
define('LOGGED_IN_SALT',   '9okgVfjvqf}pOnE,:vZq`cIweEMlv*lIv}E3v,(t!xY7n9X2NUFf$F&8H@c,: qK');
define('NONCE_SALT',       'iCIDCdyO{TIF5H/S^-ipg7n<=w$v;n%s}h#UjAxE^>q<[/q !9Z.h7~nvFCl&#n+');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
