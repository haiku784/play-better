# Import necessary libraries
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = 'initial_migration_id'
down_revision = None
branch_labels = None
depends_on = None

def upgrade():
    # Create user performance table
    op.create_table(
        'user_performance',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('user_id', sa.Integer, index=True),
        sa.Column('score', sa.Float, nullable=False),
        sa.Column('timestamp', sa.String, nullable=False),
    )

def downgrade():
    # Drop user performance table
    op.drop_table('user_performance')